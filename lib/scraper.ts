
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Trend } from './data';

export async function scrapeAITrends(): Promise<Trend[]> {
    const trends: Trend[] = [];

    // 1. Scrape GitHub Trending (Python/AI focused)
    try {
        const { data } = await axios.get('https://github.com/trending/python?since=weekly');
        const $ = cheerio.load(data);

        $('.Box-row').each((i, el) => {
            if (i >= 3) return; // Limit to top 3 for this source

            const title = $(el).find('h2 a').text().trim().replace(/\s+/g, '/');
            const description = $(el).find('p').text().trim();
            const stars = $(el).find('a[href$="/stargazers"]').text().trim();

            trends.push({
                id: `gh-${i}`,
                title: `GitHub Trending: ${title}`,
                category: 'Code', // We might need to update the Category type
                summary: `${description} (${stars} stars)`,
                source: 'GitHub',
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                impactScore: 8 + (Math.random() * 2),
                tags: ['Open Source', 'Python', 'GitHub']
            } as any); // Type assertion for now as we might need to expand Trend interface
        });
    } catch (error) {
        console.error('Error scraping GitHub:', error);
    }

    // 2. Scrape Hugging Face Trending (Models)
    // Note: Hugging Face generates a lot of content dynamically, but the main model list often has SSR content.
    // We'll try to fetch the main models page.
    try {
        const { data } = await axios.get('https://huggingface.co/models?sort=trending');
        const $ = cheerio.load(data);

        // Select the first few model cards (selectors depend on HF current layout, might be brittle)
        // HF layout is complex, let's look for article tags or similar lists.
        // A robust way for a demo is difficult without an API key or complex selectors.
        // Let's rely on a simpler structure if possible, or Mock data if scraping fails.

        // Trying a generic selector for the list items
        $('article').each((i, el) => {
            if (i >= 3) return;
            const title = $(el).find('header h4').text().trim();
            // Clean up the likes/downloads string from the messy layout text
            const footerText = $(el).find('div').last().text().trim().replace(/\s+/g, ' ');

            if (title) {
                trends.push({
                    id: `hf-${i}`,
                    title: `HF Trending: ${title}`,
                    category: 'Model',
                    summary: `Trending model on Hugging Face. Stats: ${footerText}`,
                    source: 'Hugging Face',
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    impactScore: 9,
                    tags: ['Model', 'Hugging Face', 'NLP']
                });
            }
        });

    } catch (error) {
        console.error('Error scraping Hugging Face:', error);
    }

    // 3. Fake "News" Scrape (simulated for reliability in demo if real scraping is blocked)
    // Real scraping of news sites often hits roadblocks with simple axios/cheerio due to antibot.
    // We will keep the static ones as a fallback base, and append these scraped ones.

    return trends;
}
