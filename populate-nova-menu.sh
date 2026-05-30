#!/usr/bin/env bash
set -uo pipefail

# ─── CONFIG ───────────────────────────────────────────────────────────────────
PROJECT_ID="dcvvjeo8"
DATASET="production"
API_VERSION="2024-01-01"
BASE_URL="https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}"
TOKEN="${SANITY_TOKEN:?'SANITY_TOKEN env var is required'}"
AUTH="Authorization: Bearer ${TOKEN}"

# ─── HELPERS ──────────────────────────────────────────────────────────────────
mutate() {
  curl -sf -X POST "${BASE_URL}/data/mutate/${DATASET}" \
    -H "${AUTH}" \
    -H "Content-Type: application/json" \
    -d "$1"
}

# Upload image — returns asset _id or empty string on failure
upload_image() {
  local url="$1"
  local filename="$2"
  echo "  Uploading: ${filename}..." >&2
  local response
  response=$(curl -sf -L \
    -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
    --max-time 20 \
    "$url" 2>/dev/null | \
    curl -sf -X POST "${BASE_URL}/assets/images/${DATASET}" \
      -H "${AUTH}" \
      -H "Content-Type: image/jpeg" \
      --data-binary @- 2>/dev/null) || true
  if [[ -n "$response" ]]; then
    local asset_id
    asset_id=$(echo "$response" | grep -o '"_id":"[^"]*"' | head -1 | cut -d'"' -f4)
    if [[ -n "$asset_id" ]]; then
      echo "    ✓ ${asset_id}" >&2
      echo "$asset_id"
      return
    fi
  fi
  echo "    ✗ Failed — item will be created without image" >&2
  echo ""
}

# Build image field JSON — empty string means omit the field
image_field() {
  local asset_id="$1"
  if [[ -n "$asset_id" ]]; then
    echo "\"image\": { \"_type\": \"image\", \"asset\": { \"_type\": \"reference\", \"_ref\": \"${asset_id}\" } },"
  else
    echo ""
  fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " Nova Restaurant — Menu Seed Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ─── STEP 1: CATEGORIES ───────────────────────────────────────────────────────
echo ""
echo "▶ Creating categories..."

CAT_SPECIALS="nova-cat-specials"
CAT_WINE="nova-cat-wine"
CAT_BREAKFAST="nova-cat-breakfast"

mutate "{\"mutations\":[
  {\"createOrReplace\":{\"_id\":\"${CAT_SPECIALS}\",\"_type\":\"menuCategory\",\"name\":\"Specials\",\"description\":\"Nova's signature dishes — bold flavours, premium ingredients, and the plates our guests keep coming back for.\",\"order\":1}},
  {\"createOrReplace\":{\"_id\":\"${CAT_WINE}\",\"_type\":\"menuCategory\",\"name\":\"Wine\",\"description\":\"A curated selection of red, white, rosé, and sparkling wines to complement your dining experience at Nova.\",\"order\":2}},
  {\"createOrReplace\":{\"_id\":\"${CAT_BREAKFAST}\",\"_type\":\"menuCategory\",\"name\":\"Breakfast\",\"description\":\"Start your morning right — from light continental options to hearty Nigerian breakfasts, served fresh daily.\",\"order\":3}}
]}" > /dev/null && echo "  ✓ Categories ready"

# ─── STEP 2: UPLOAD IMAGES ────────────────────────────────────────────────────
echo ""
echo "▶ Uploading images..."

IMG_PINEAPPLE=$(upload_image "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80&fm=jpg" "pineapple-rice")
IMG_PEPPERED=$(upload_image "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80&fm=jpg" "peppered-meat")
IMG_PEPPER_SOUP=$(upload_image "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80&fm=jpg" "pepper-soup")
IMG_GRILLED_FISH=$(upload_image "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80&fm=jpg" "grilled-fish")
IMG_JOLLOF=$(upload_image "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80&fm=jpg" "jollof-rice")

IMG_RED_WINE=$(upload_image "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80&fm=jpg" "red-wine")
IMG_WHITE_WINE=$(upload_image "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fm=jpg" "white-wine")
IMG_ROSE=$(upload_image "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80&fm=jpg" "rose-wine")
IMG_CHAMPAGNE=$(upload_image "https://images.unsplash.com/photo-1576514249734-7bf2c63f3a69?w=800&q=80&fm=jpg" "champagne")

IMG_EGGS=$(upload_image "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80&fm=jpg" "eggs")
IMG_PANCAKES=$(upload_image "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80&fm=jpg" "pancakes")
IMG_AKARA=$(upload_image "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80&fm=jpg" "akara")
IMG_FRUIT=$(upload_image "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&q=80&fm=jpg" "fruit-bowl")

# ─── STEP 3: SPECIALS ─────────────────────────────────────────────────────────
echo ""
echo "▶ Creating Specials..."

create_item() {
  local name="$1" cat="$2" desc="$3" asset_id="$4" alt="$5" price="$6" tags="$7" featured="$8" order="$9"
  local img
  img=$(image_field "$asset_id")
  mutate "{\"mutations\":[{\"create\":{
    \"_type\":\"menuItem\",
    \"name\":\"${name}\",
    \"category\":{\"_type\":\"reference\",\"_ref\":\"${cat}\"},
    \"description\":\"${desc}\",
    ${img}
    \"imageAlt\":\"${alt}\",
    \"price\":${price},
    \"tags\":${tags},
    \"featured\":${featured},
    \"available\":true,
    \"order\":${order}
  }}]}" > /dev/null
}

create_item "Pineapple Fried Rice" "$CAT_SPECIALS" \
  "Nova's most-requested dish — fragrant long-grain rice wok-fried with fresh pineapple, tiger prawns, and seasoned chicken strips." \
  "$IMG_PINEAPPLE" "Pineapple fried rice garnished with prawns and fresh herbs" \
  5500 '["POPULAR","SIGNATURE"]' true 1

create_item "Peppered Assorted" "$CAT_SPECIALS" \
  "A bold medley of grilled and peppered cow leg, tripe, and shaki slow-cooked in Nova's signature scotch bonnet pepper sauce." \
  "$IMG_PEPPERED" "Peppered assorted meats in rich sauce served in a cast iron bowl" \
  6800 '["POPULAR","SPICY","LOCAL FAVOURITE"]' true 2

create_item "Nova Pepper Soup" "$CAT_SPECIALS" \
  "Light, aromatic, and deeply spiced — our catfish pepper soup brewed with traditional utazi leaves and native spices." \
  "$IMG_PEPPER_SOUP" "Catfish pepper soup in a deep bowl with utazi leaves" \
  4500 '["TRADITIONAL","SPICY","LOCAL FAVOURITE"]' false 3

create_item "Grilled Tilapia" "$CAT_SPECIALS" \
  "Whole tilapia marinated in herbs, garlic, and citrus, grilled over open flame. Served with jollof rice or plantain." \
  "$IMG_GRILLED_FISH" "Whole grilled tilapia with herbs and lemon on a wooden board" \
  7200 '["GRILLED","SIGNATURE"]' false 4

create_item "Party Jollof Rice" "$CAT_SPECIALS" \
  "The real thing — smoky firewood-style jollof rice cooked low and slow with plum tomatoes and bay leaves. Served with your choice of protein." \
  "$IMG_JOLLOF" "Smoky party jollof rice with fried plantain and grilled chicken" \
  4800 '["POPULAR","TRADITIONAL","LOCAL FAVOURITE"]' false 5

echo "  ✓ Specials done"

# ─── STEP 4: WINE ─────────────────────────────────────────────────────────────
echo ""
echo "▶ Creating Wine..."

create_item "Cabernet Sauvignon" "$CAT_WINE" \
  "A full-bodied South African red with notes of dark cherry, cedar, and a long smooth finish. Pairs beautifully with our grilled dishes." \
  "$IMG_RED_WINE" "Glass of deep red Cabernet Sauvignon wine" \
  8500 '["CURATED","LUXURY"]' false 1

create_item "Sauvignon Blanc" "$CAT_WINE" \
  "Crisp and refreshing with bright citrus and green apple notes. An ideal pairing for our seafood specials and light starters." \
  "$IMG_WHITE_WINE" "Chilled glass of Sauvignon Blanc white wine with citrus garnish" \
  7800 '["CURATED"]' false 2

create_item "Rosé Provençal" "$CAT_WINE" \
  "Pale, elegant, and dry with delicate notes of strawberry and cream. A favourite for date nights and our live music evenings." \
  "$IMG_ROSE" "Pale pink glass of dry Provençal rosé wine in candlelight" \
  8000 '["CURATED","POPULAR"]' false 3

create_item "Moët & Chandon Brut" "$CAT_WINE" \
  "The classic celebration champagne — fine bubbles, green apple, citrus zest, and a brioche finish. Perfect for birthdays and anniversaries." \
  "$IMG_CHAMPAGNE" "Bottle of Moet champagne with flutes on ice in a silver bucket" \
  32000 '["LUXURY","SIGNATURE"]' false 4

echo "  ✓ Wine done"

# ─── STEP 5: BREAKFAST ────────────────────────────────────────────────────────
echo ""
echo "▶ Creating Breakfast..."

create_item "Nova Full Breakfast" "$CAT_BREAKFAST" \
  "Two eggs your way, grilled sausage, baked beans, sautéed mushrooms, grilled tomato, and toasted bread. Served with fresh juice or tea." \
  "$IMG_EGGS" "Full breakfast plate with eggs, sausage, tomatoes and toast" \
  3800 '["POPULAR","CLASSIC"]' false 1

create_item "Fluffy Pancakes" "$CAT_BREAKFAST" \
  "Stack of three butter-soft pancakes with maple syrup, fresh berries, and a dusting of icing sugar. A sweet way to start your morning." \
  "$IMG_PANCAKES" "Stack of fluffy golden pancakes with maple syrup and fresh berries" \
  3200 '["POPULAR","CLASSIC"]' false 2

create_item "Akara & Ogi" "$CAT_BREAKFAST" \
  "Crispy golden bean cakes paired with smooth lightly sweetened corn porridge. A beloved Nigerian breakfast made the traditional way." \
  "$IMG_AKARA" "Golden akara bean cakes with a bowl of smooth white ogi porridge" \
  2500 '["TRADITIONAL","LOCAL FAVOURITE","NO-ALCOHOL"]' false 3

create_item "Seasonal Fruit Bowl" "$CAT_BREAKFAST" \
  "Freshly cut seasonal fruits — watermelon, pineapple, pawpaw, and banana — drizzled with honey and a squeeze of lime." \
  "$IMG_FRUIT" "Colourful bowl of fresh seasonal tropical fruits with honey drizzle" \
  2200 '["NO-ALCOHOL","CLASSIC"]' false 4

echo "  ✓ Breakfast done"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " ✓ Done! 3 categories + 13 menu items"
echo " Items without images: update manually"
echo " Open Studio to review and publish all"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"