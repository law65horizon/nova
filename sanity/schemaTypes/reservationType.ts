import { defineField, defineType } from "sanity";

export const reservationType = defineType({
  name: "reservation",
  title: "Reservation",
  type: "document",
  fields: [
    defineField({
      name: "guestName",
      title: "Guest Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Reservation Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Preferred Time",
      type: "string",
      options: {
        list: [
          { title: "12:00 PM", value: "12:00" },
          { title: "1:00 PM", value: "13:00" },
          { title: "2:00 PM", value: "14:00" },
          { title: "3:00 PM", value: "15:00" },
          { title: "5:00 PM", value: "17:00" },
          { title: "6:00 PM", value: "18:00" },
          { title: "7:00 PM", value: "19:00" },
          { title: "8:00 PM (Live Music)", value: "20:00" },
          { title: "9:00 PM (Live Music)", value: "21:00" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "partySize",
      title: "Party Size",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(20),
    }),
    defineField({
      name: "occasion",
      title: "Special Occasion",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Birthday", value: "birthday" },
          { title: "Anniversary", value: "anniversary" },
          { title: "Business Dinner", value: "business" },
          { title: "Family Gathering", value: "family" },
          { title: "Live Music Night", value: "live_music" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "packageRequest",
      title: "Family Package Request",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "The Nova Family Platter (up to 5)", value: "nova_family" },
          { title: "The Legislators' Table (up to 4)", value: "legislators" },
          { title: "The Weekend Duo (2 people)", value: "duo" },
        ],
      },
    }),
    defineField({
      name: "notes",
      title: "Special Requests / Notes",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "pending",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Cancelled", value: "cancelled" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "guestName",
      subtitle: "date",
      media: "status",
    },
    prepare({ title, subtitle }) {
      return { title, subtitle: `${subtitle}` };
    },
  },
  orderings: [
    {
      title: "Date (newest first)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
