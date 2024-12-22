// k6 Load and Performance Testing Script for App.js
// ---------------------------------------------------
// This script tests the performance of the /validate endpoint of the Node.js application.
// 
// Key Features:
// 1. Sends POST requests to the /validate endpoint.
// 2. Includes custom checks for response validation.
// 3. Defines thresholds for response times and error rates.
// 4. Simulates multiple user scenarios using different executors.
// 5. Captures metrics such as request duration, success rate, and failure rate.

// using this command should be able run tests and before running navigate to folder where file is located 
//k6 run tests/smoke-test.js 

//setup visualization on AWS

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

// Define custom metrics
export const errorRate = new Rate('errors');
export const requestDuration = new Trend('request_duration', true);
export const requestSuccessRate = new Rate('request_success_rate');

// Options for load testing
export const options = {
    thresholds: {
        'http_req_duration': ['p(95)<500'], // 95% of requests should complete within 500ms
        'errors': ['rate<0.01'], // Error rate should be less than 1%
        'request_success_rate': ['rate>0.99'], // Success rate should be greater than 99%
    },
    scenarios: {
        constant_users: {
            executor: 'constant-vus',
            vus: 50, // 50 Virtual Users
            duration: '30s',
        },
        ramping_users: {
            executor: 'ramping-vus',
            startVUs: 10,
            stages: [
                { duration: '10s', target: 50 },
                { duration: '20s', target: 100 },
                { duration: '10s', target: 0 },
            ],
        },
        spike_test: {
            executor: 'constant-arrival-rate',
            rate: 200, // 200 requests per second
            timeUnit: '1s', // Time unit for the request rate
            duration: '20s', // Duration of the spike test
            preAllocatedVUs: 50, // Number of VUs to pre-allocate
            maxVUs: 100, // Maximum number of VUs allowed
        },
    },
};

// URL of the application endpoint
const BASE_URL = 'http://localhost:3000/temp-converter/api/check-answer';

// Sample payloads for testing
const payloads = [
    { value: 100, fromUnit:  'Celsius', toUnit: 'Fahrenheit', studentResponse: 212 },
    { value: 0, fromUnit: 'Celsius', toUnit: 'Kelvin', studentResponse: 273.15 },
    { value: 32, fromUnit: 'Fahrenheit', toUnit: 'Celsius', studentResponse: 0 },
    { value: 273.15, fromUnit: 'Kelvin', toUnit: 'Rankine', studentResponse: 491.67 },
];

// Utility function to randomly pick a payload
function getRandomPayload() {
    return payloads[Math.floor(Math.random() * payloads.length)];
}

// Test execution function
export default function () {
    // Pick a random payload
    const payload = getRandomPayload();

    // Send POST request
    const res = http.post(BASE_URL, JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json' },
    });

    // Record custom metrics
    requestDuration.add(res.timings.duration);
    requestSuccessRate.add(res.status === 200);
    errorRate.add(res.status !== 200);

    // Validate response
    check(res, {
        'response status is 200': (r) => r.status === 200,
        'response contains result': (r) => r.json().result !== undefined,
        'response time is less than 500ms': (r) => r.timings.duration < 500,
    });

    // Simulate user think time
    sleep(1);
}