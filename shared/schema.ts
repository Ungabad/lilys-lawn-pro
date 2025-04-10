import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: text("created_at").notNull().default("NOW()"),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  address: text("address"),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default("NOW()"),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  serviceType: text("service_type").notNull(),
  serviceAddress: text("service_address").notNull(),
  scheduledDate: text("scheduled_date").notNull(),
  scheduledTime: text("scheduled_time").notNull(),
  status: text("status").notNull().default("scheduled"), // scheduled, completed, cancelled
  notes: text("notes"),
  createdAt: text("created_at").notNull().default("NOW()"),
  paymentStatus: text("payment_status").notNull().default("pending"), // pending, paid, refunded
  paymentId: text("payment_id"), // Square payment ID
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  appointmentId: integer("appointment_id").notNull(),
  squarePaymentId: text("square_payment_id"),
  amount: integer("amount").notNull(), // in cents
  currency: text("currency").notNull().default("USD"),
  status: text("status").notNull().default("pending"), // pending, completed, failed, refunded
  createdAt: text("created_at").notNull().default("NOW()"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  phone: true,
  service: true,
  address: true,
  message: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments).pick({
  customerName: true,
  customerEmail: true,
  customerPhone: true,
  serviceType: true,
  serviceAddress: true,
  scheduledDate: true,
  scheduledTime: true,
  notes: true,
});

export const updateAppointmentSchema = createInsertSchema(appointments).pick({
  status: true,
  notes: true,
  paymentStatus: true,
  paymentId: true,
});

export const insertPaymentSchema = createInsertSchema(payments).pick({
  appointmentId: true,
  squarePaymentId: true,
  amount: true,
  currency: true,
  status: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

export type UpdateAppointment = z.infer<typeof updateAppointmentSchema>;

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;
