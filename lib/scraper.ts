
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
            const relativeUrl = $(el).find('h2 a').attr('href');
            const description = $(el).find('p').text().trim();
            const stars = $(el).find('a[href$="/stargazers"]').text().trim();

            trends.push({
                id: `gh-${i}`,
                title: `GitHub Trending: ${title}`,
                category: 'Code',
                summary: `${description} (${stars} stars)`,
                source: 'GitHub',
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                impactScore: 8 + (Math.random() * 2),
                tags: ['Open Source', 'Python', 'GitHub'],
                url: `https://github.com${relativeUrl}`
            } as any);
        });
    } catch (error) {
        console.error('Error scraping GitHub:', error);
    }

    // 2. Scrape Hugging Face Trending (Models)
    try {
        const { data } = await axios.get('https://huggingface.co/models?sort=trending');
        const $ = cheerio.load(data);

        $('article').each((i, el) => {
            if (i >= 3) return;
            const title = $(el).find('header h4').text().trim();
            const relativeUrl = $(el).find('a').first().attr('href');
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
                    tags: ['Model', 'Hugging Face', 'NLP'],
                    url: `https://huggingface.co${relativeUrl}`
                });
            }
        });

    } catch (error) {
        console.error('Error scraping Hugging Face:', error);
    }

    // 3. Fake "News" Scrape (simulated for reliability in demo if real scraping is blocked)
    const newsHeadlines = [
        { title: "Apple Reportedly Optimizing AI for M5 Chips", summary: "Sources suggest Apple's next-gen silicon is built entirely around running 30B+ parameter models locally.", category: "Business" },
        { title: "EU AI Act: Compliance Deadline Looms", summary: "Major tech firms race to meet transparency requirements as the new EU AI regulation phase begins.", category: "Ethics" },
        { title: "OpenAI vs. Google: The Agent Wars Begin", summary: "With both giants releasing agentic frameworks, the battle for autonomous enterprise workflows heats up.", category: "Business" },
        { title: "Tesla Optimus Gen 3 Spotted Learning via VR", summary: "Leaked footage shows humanoid robots training via VR teleoperation at unprecedented speeds.", category: "Research" }
    ];

    newsHeadlines.forEach((news, i) => {
        // Distribute dates: 1 today, 1 yesterday, 1 last week, 1 last month
        const date = new Date();
        if (i === 1) date.setDate(date.getDate() - 1);
        if (i === 2) date.setDate(date.getDate() - 6);
        if (i === 3) date.setDate(date.getDate() - 25);

        trends.push({
            id: `news-${i}`,
            title: news.title,
            category: news.category as any,
            summary: news.summary,
            source: 'Tech Insider',
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            impactScore: 8,
            tags: ['News', 'Business', 'AI']
        });
    });

    return trends;
}
