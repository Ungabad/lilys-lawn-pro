import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body against schema
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Store the contact message
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Return success response
      res.status(201).json({ 
        success: true, 
        message: "Thank you for your message. We'll get back to you shortly.",
        data: contactMessage
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof Error) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "An unexpected error occurred" 
        });
      }
    }
  });

  // Get all contact messages (for admin purposes)
  app.get("/api/contact", async (_req: Request, res: Response) => {
    try {
      const messages = await storage.getContactMessages();
      res.status(200).json({ success: true, data: messages });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve contact messages" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
