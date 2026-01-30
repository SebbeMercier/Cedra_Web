import { NextResponse } from 'next/server';
import Redis from 'ioredis';

/**
 * Health check endpoint for Nomad and HAProxy.
 * Verifies application uptime and Valkey connectivity.
 */
export async function GET() {
  const start = Date.now();
  
  // Use a temporary client for healthcheck to avoid pooling issues in check
  const valkeyUrl = process.env.VALKEY_URL || 'valkey://localhost:6379';
  const redis = new Redis(valkeyUrl, {
    connectTimeout: 500,
    maxRetriesPerRequest: 0,
  });
  
  try {
    const valkeyStatus = await redis.ping();
    const duration = Date.now() - start;

    return NextResponse.json({
      status: 'UP',
      valkey: valkeyStatus === 'PONG' ? 'Healthy' : 'Degraded',
      uptime: process.uptime(),
      latency: `${duration}ms`,
      timestamp: new Date().toISOString()
    }, { 
      status: 200,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'DEGRADED', 
      reason: 'Valkey Unreachable',
      error: error.message 
    }, { 
      status: 503,
      headers: { 'Cache-Control': 'no-store' }
    });
  } finally {
    // Crucial: disconnect to avoid leaking connections on frequent healthchecks
    redis.disconnect();
  }
}
