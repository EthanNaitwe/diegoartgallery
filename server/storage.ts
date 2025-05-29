import { users, artworks, contactSubmissions, type User, type InsertUser, type Artwork, type InsertArtwork, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";

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
        title: "Portrait Study III",
        medium: "Graphite on paper",
        year: 2024,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
        description: "A detailed exploration of light and shadow in portraiture",
        featured: true
      },
      {
        title: "Botanical Study",
        medium: "Charcoal and graphite",
        year: 2024,
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
        description: "Intricate study of natural forms and textures",
        featured: false
      },
      {
        title: "Geometric Forms",
        medium: "Ink on paper",
        year: 2024,
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
        description: "Abstract exploration of geometric relationships",
        featured: false
      },
      {
        title: "Urban Landscape",
        medium: "Pencil and charcoal",
        year: 2024,
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
        description: "Architectural study capturing urban rhythms",
        featured: false
      },
      {
        title: "Figure Study V",
        medium: "Conte crayon",
        year: 2024,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
        description: "Human form study emphasizing gesture and movement",
        featured: false
      },
      {
        title: "Still Life Composition",
        medium: "Graphite on paper",
        year: 2023,
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
        description: "Classic still life exploring form and texture",
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

export const storage = new MemStorage();
