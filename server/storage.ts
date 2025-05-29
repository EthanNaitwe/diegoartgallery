import { users, artworks, contactSubmissions, type User, type InsertUser, type Artwork, type InsertArtwork, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getArtworks(): Promise<Artwork[]>;
  getArtwork(id: number): Promise<Artwork | undefined>;
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
  
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private artworks: Map<number, Artwork>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentUserId: number;
  private currentArtworkId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.artworks = new Map();
    this.contactSubmissions = new Map();
    this.currentUserId = 1;
    this.currentArtworkId = 1;
    this.currentContactId = 1;
    
    // Initialize with sample artworks
    this.initializeArtworks();
  }

  private initializeArtworks() {
    const sampleArtworks: InsertArtwork[] = [
      {
        title: "Abstract Expressions",
        medium: "Acrylic on canvas",
        year: 2024,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
        description: "A contemporary exploration of color and form",
        featured: true
      },
      {
        title: "Urban Reflections",
        medium: "Mixed media",
        year: 2024,
        imageUrl: "https://images.unsplash.com/photo-1569701802593-14db3b16a37f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
        description: "Modern cityscape captured through contemporary lens",
        featured: false
      },
      {
        title: "Color Symphony",
        medium: "Oil on canvas",
        year: 2024,
        imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
        description: "Vibrant composition exploring emotional depth",
        featured: false
      },
      {
        title: "Textural Landscape",
        medium: "Mixed media on board",
        year: 2024,
        imageUrl: "https://images.unsplash.com/photo-1582561193-2e42cdb52e6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
        description: "Contemporary interpretation of natural forms",
        featured: false
      },
      {
        title: "Minimalist Study",
        medium: "Charcoal on paper",
        year: 2024,
        imageUrl: "https://images.unsplash.com/photo-1577720643271-6760b609d55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
        description: "Clean lines and negative space exploration",
        featured: false
      },
      {
        title: "Contemporary Vision",
        medium: "Acrylic and digital",
        year: 2023,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
        description: "Fusion of traditional and modern techniques",
        featured: false
      }
    ];

    sampleArtworks.forEach(artwork => {
      this.createArtwork(artwork);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getArtworks(): Promise<Artwork[]> {
    return Array.from(this.artworks.values());
  }

  async getArtwork(id: number): Promise<Artwork | undefined> {
    return this.artworks.get(id);
  }

  async createArtwork(insertArtwork: InsertArtwork): Promise<Artwork> {
    const id = this.currentArtworkId++;
    const artwork: Artwork = { ...insertArtwork, id };
    this.artworks.set(id, artwork);
    return artwork;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const submission: ContactSubmission = { 
      ...insertSubmission, 
      id,
      createdAt: new Date()
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getArtworks(): Promise<Artwork[]> {
    return await db.select().from(artworks);
  }

  async getArtwork(id: number): Promise<Artwork | undefined> {
    const [artwork] = await db.select().from(artworks).where(eq(artworks.id, id));
    return artwork || undefined;
  }

  async createArtwork(insertArtwork: InsertArtwork): Promise<Artwork> {
    const [artwork] = await db
      .insert(artworks)
      .values(insertArtwork)
      .returning();
    return artwork;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }
}

export const storage = new DatabaseStorage();
