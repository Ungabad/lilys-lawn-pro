import { 
  contactMessages, type ContactMessage, type InsertContactMessage, 
  users, type User, type InsertUser,
  appointments, type Appointment, type InsertAppointment, type UpdateAppointment,
  payments, type Payment, type InsertPayment
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact message operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Appointment operations
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  getAppointments(): Promise<Appointment[]>;
  updateAppointment(id: number, updates: Partial<UpdateAppointment>): Promise<Appointment | undefined>;
  
  // Payment operations
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPayment(id: number): Promise<Payment | undefined>;
  getPaymentsByAppointment(appointmentId: number): Promise<Payment[]>;
  updatePayment(id: number, updates: Partial<InsertPayment>): Promise<Payment | undefined>;
  
  // Session store for authentication
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private appointments: Map<number, Appointment>;
  private payments: Map<number, Payment>;
  
  userCurrentId: number;
  messageCurrentId: number;
  appointmentCurrentId: number;
  paymentCurrentId: number;
  
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.appointments = new Map();
    this.payments = new Map();
    
    this.userCurrentId = 1;
    this.messageCurrentId = 1;
    this.appointmentCurrentId = 1;
    this.paymentCurrentId = 1;
    
    // Create memory store for sessions
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Create an admin user by default
    this.createUser({
      username: "admin",
      password: "admin123", // This would be hashed in a real application
      isAdmin: true
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const createdAt = new Date().toISOString();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt,
      isAdmin: insertUser.isAdmin ?? false, // Ensure isAdmin is always defined
    };
    this.users.set(id, user);
    return user;
  }

  // Contact message operations
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageCurrentId++;
    const createdAt = new Date().toISOString();
    const contactMessage: ContactMessage = { 
      ...message, 
      id, 
      createdAt,
      address: message.address || null, // Ensure address is string | null
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  // Appointment operations
  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentCurrentId++;
    const createdAt = new Date().toISOString();
    const newAppointment: Appointment = { 
      ...appointment, 
      id, 
      createdAt,
      status: "scheduled",
      paymentStatus: "pending",
      paymentId: null,
      notes: appointment.notes || null, // Ensure notes is string | null
    };
    this.appointments.set(id, newAppointment);
    return newAppointment;
  }
  
  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }
  
  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }
  
  async updateAppointment(id: number, updates: Partial<UpdateAppointment>): Promise<Appointment | undefined> {
    const appointment = await this.getAppointment(id);
    if (!appointment) return undefined;
    
    const updatedAppointment = { ...appointment, ...updates };
    this.appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }
  
  // Payment operations
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const id = this.paymentCurrentId++;
    const createdAt = new Date().toISOString();
    const newPayment: Payment = { 
      ...payment, 
      id, 
      createdAt,
      status: payment.status || "pending", // Ensure status is defined
      currency: payment.currency || "USD", // Ensure currency is defined
      squarePaymentId: payment.squarePaymentId || null, // Ensure squarePaymentId is string | null
    };
    this.payments.set(id, newPayment);
    return newPayment;
  }
  
  async getPayment(id: number): Promise<Payment | undefined> {
    return this.payments.get(id);
  }
  
  async getPaymentsByAppointment(appointmentId: number): Promise<Payment[]> {
    return Array.from(this.payments.values()).filter(
      payment => payment.appointmentId === appointmentId
    );
  }
  
  async updatePayment(id: number, updates: Partial<InsertPayment>): Promise<Payment | undefined> {
    const payment = await this.getPayment(id);
    if (!payment) return undefined;
    
    const updatedPayment = { ...payment, ...updates };
    this.payments.set(id, updatedPayment);
    return updatedPayment;
  }
}

export const storage = new MemStorage();
