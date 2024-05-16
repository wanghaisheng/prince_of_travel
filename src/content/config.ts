// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      SEOdescription: z.string(),
      author: z.string(),
      imageUrl: z.string(),
      imageAlt: z.string(),
      category: z.string(),
      tags: z.array(z.string()),
      featured: z.string(),
      contents: z.array(z.object()),
      carousel: z.array(z.object()),
      gallery: z.array(z.object())
      })
  });

  const news = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      SEOdescription: z.string(),
      author: z.string(),
      imageUrl: z.string(),
      imageAlt: z.string(),
      category: z.string(),
      tags: z.array(z.string()),
      featured: z.string(),
      contents: z.array(z.object()),
      carousel: z.array(z.string()),
      gallery: z.array(z.string())
    })
  });

  const reviews = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      SEOdescription: z.string(),
      author: z.string(),
      imageUrl: z.string(),
      imageAlt: z.string(),
      category: z.string(),
      tags: z.array(z.string()),
      featured: z.string(),
      contents: z.array(z.object()),
      carousel: z.array(z.string()),
      gallery: z.array(z.string())
    })
  });

  const guides = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      SEOdescription: z.string(),
      author: z.string(),
      imageUrl: z.string(),
      imageAlt: z.string(),
      category: z.string(),
      tags: z.array(z.string()),
      featured: z.string(),
      contents: z.array(z.object()),
      carousel: z.array(z.object()),
      gallery: z.array(z.object())
    })
  });
  
  const credit_cards = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      rating: z.string(),
      mr_points: z.string(),
      fy_value: z.string(),
      signup_bonus: z.array(z.string()),
      fee: z.string(),
      required_spend: z.string(),
      bank: z.string(),
      payment_network: z.string(),
      points_program: z.string(),
      earning_rate: z.array(z.string()),
      perks: z.array(z.string()),
      insurance: z.string(),
      card_type: z.string(),
      apply_link: z.string(),
      apply_content: z.string(),
      best_for: z.string(),
      description: z.string(),
      SEOdescription: z.string(),
      author: z.string(),
      imageUrl: z.string(),
      imageAlt: z.string(),
      category: z.string(),
      tags: z.array(z.string()),
      featured: z.string(),
      contents: z.array(z.object())
    })
  });

  const authors = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        description: z.string(),
        imageUrl: z.string(),
        imageAlt: z.string(),
      })
  });
  
  // make all fields optional for no errors if fields are undefined or null
  // https://github.com/colinhacks/zod?tab=readme-ov-file#nonempty
  const content = z.optional(blog, news, reviews, guides, credit_cards, authors);

  export const collections = {
    'blog': content.blog,
    'guides': content.guides,
    'reviews': content.reviews,
    'news': content.news,
    'credit-cards': content.credit_cards,
    'authors': content.authors,
  };