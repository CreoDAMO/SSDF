
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const apiValidationRouter = router({
  testAllAPIs: publicProcedure
    .input(z.object({
      testLevel: z.enum(['basic', 'full']).default('basic')
    }))
    .mutation(async ({ input }) => {
      const results: Record<string, any> = {};
      
      // Test OpenAI API
      if (process.env.OPENAI_API_KEY) {
        try {
          const response = await fetch('https://api.openai.com/v1/models', {
            headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
            }
          });
          results.openai = {
            status: response.ok ? 'connected' : 'failed',
            statusCode: response.status
          };
        } catch (error) {
          results.openai = { status: 'error', message: 'Connection failed' };
        }
      } else {
        results.openai = { status: 'not_configured' };
      }

      // Test Grok API
      if (process.env.GROK_API_KEY) {
        try {
          const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: 'Hello' }],
              model: 'grok-beta',
              max_tokens: 1
            })
          });
          results.grok = {
            status: response.ok ? 'connected' : 'failed',
            statusCode: response.status
          };
        } catch (error) {
          results.grok = { status: 'error', message: 'Connection failed' };
        }
      } else {
        results.grok = { status: 'not_configured' };
      }

      // Test DeepSeek API
      if (process.env.DEEPSEEK_API_KEY) {
        try {
          const response = await fetch('https://api.deepseek.com/v1/models', {
            headers: {
              'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
              'Content-Type': 'application/json'
            }
          });
          results.deepseek = {
            status: response.ok ? 'connected' : 'failed',
            statusCode: response.status
          };
        } catch (error) {
          results.deepseek = { status: 'error', message: 'Connection failed' };
        }
      } else {
        results.deepseek = { status: 'not_configured' };
      }

      // Test Claude API (Anthropic)
      if (process.env.CLAUDE_API_KEY) {
        try {
          const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'x-api-key': process.env.CLAUDE_API_KEY,
              'Content-Type': 'application/json',
              'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
              model: 'claude-3-sonnet-20240229',
              max_tokens: 1,
              messages: [{ role: 'user', content: 'Hello' }]
            })
          });
          results.claude = {
            status: response.ok ? 'connected' : 'failed',
            statusCode: response.status
          };
        } catch (error) {
          results.claude = { status: 'error', message: 'Connection failed' };
        }
      } else {
        results.claude = { status: 'not_configured' };
      }

      // Test Gemini API
      if (process.env.GEMINI_API_KEY) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
          results.gemini = {
            status: response.ok ? 'connected' : 'failed',
            statusCode: response.status
          };
        } catch (error) {
          results.gemini = { status: 'error', message: 'Connection failed' };
        }
      } else {
        results.gemini = { status: 'not_configured' };
      }

      // Test Perplexity API
      if (process.env.PERPLEXITY_API_KEY) {
        try {
          const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: 'llama-3.1-sonar-small-128k-online',
              messages: [{ role: 'user', content: 'Hello' }],
              max_tokens: 1
            })
          });
          results.perplexity = {
            status: response.ok ? 'connected' : 'failed',
            statusCode: response.status
          };
        } catch (error) {
          results.perplexity = { status: 'error', message: 'Connection failed' };
        }
      } else {
        results.perplexity = { status: 'not_configured' };
      }

      // Test Supabase connection
      if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
        try {
          const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/`, {
            headers: {
              'apikey': process.env.SUPABASE_SERVICE_KEY,
              'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`
            }
          });
          results.supabase = {
            status: response.ok ? 'connected' : 'failed',
            statusCode: response.status
          };
        } catch (error) {
          results.supabase = { status: 'error', message: 'Connection failed' };
        }
      } else {
        results.supabase = { status: 'not_configured' };
      }

      return {
        timestamp: new Date().toISOString(),
        testLevel: input.testLevel,
        totalAPIs: Object.keys(results).length,
        connectedAPIs: Object.values(results).filter((r: any) => r.status === 'connected').length,
        results
      };
    }),

  getAPIStatus: publicProcedure
    .query(async () => {
      const apiKeys = [
        'OPENAI_API_KEY',
        'GROK_API_KEY', 
        'DEEPSEEK_API_KEY',
        'CLAUDE_API_KEY',
        'GEMINI_API_KEY',
        'PERPLEXITY_API_KEY',
        'SUPABASE_URL',
        'SUPABASE_SERVICE_KEY',
        'CHAINLINK_API_KEY',
        'STRIPE_SECRET_KEY'
      ];

      const status = apiKeys.reduce((acc, key) => {
        acc[key] = {
          configured: !!process.env[key],
          hasValue: !!(process.env[key] && process.env[key].length > 0)
        };
        return acc;
      }, {} as Record<string, any>);

      return {
        totalKeys: apiKeys.length,
        configuredKeys: Object.values(status).filter((s: any) => s.configured).length,
        status
      };
    })
});
