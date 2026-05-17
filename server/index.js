import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BrevoClient, BrevoError } from '@getbrevo/brevo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 5055;
const contactMessages = [];

const brevo = process.env.BREVO_API_KEY
  ? new BrevoClient({
      apiKey: process.env.BREVO_API_KEY,
      timeout: 30000,
      maxRetries: 2
    })
  : null;

const requiredEmailEnv = ['BREVO_API_KEY', 'BREVO_SENDER', 'MY_EMAIL'];
const missingEmailEnv = requiredEmailEnv.filter((key) => !process.env[key]);

if (missingEmailEnv.length) {
  console.warn(`Brevo email is disabled. Missing env: ${missingEmailEnv.join(', ')}`);
} else {
  console.log('Brevo transactional email is configured.');
}

const escapeHtml = (value) => {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
};

const getBrevoErrorDetails = (error) => {
  if (error instanceof BrevoError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      body: error.body
    };
  }

  return {
    message: error instanceof Error ? error.message : 'Unknown email error'
  };
};

const sendBrevoEmail = async ({ subject, htmlContent, textContent, replyTo }) => {
  if (!brevo || missingEmailEnv.length) {
    throw new Error(`Brevo is not configured. Missing env: ${missingEmailEnv.join(', ')}`);
  }

  return brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: 'Portfolio Contact',
      email: process.env.BREVO_SENDER
    },
    to: [{ email: process.env.MY_EMAIL }],
    replyTo,
    subject,
    htmlContent,
    textContent
  });
};

const buildContactEmail = ({ name, email, message }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br>');

  return `
    <div style="font-family:Arial,sans-serif;padding:20px;color:#111827">
      <h2 style="margin:0 0 16px">New Portfolio Contact</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <div style="padding:12px;background:#f4f4f4;border-radius:8px;line-height:1.5">
        ${safeMessage}
      </div>
    </div>
  `;
};

const buildContactText = ({ name, email, message }) => {
  return `New Portfolio Contact\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const profile = {
  name: 'Mohd Viquaruddin Anas',
  role: 'Software Developer',
  location: 'Bangalore, Karnataka, India',
  email: 'viquaruddinanas2694@gmail.com',
  phone: '+91 8919166006',
  linkedin: 'https://www.linkedin.com/in/mohd-viquaruddin-anas-402a14282',
  github: 'https://github.com/Anas2694',
  resumeUrl: '/assets/MohdViquaruddinAnas_Resume.pdf',
  paperUrl: '/assets/Trust_Aware_Q_Learning_IoT_Routing.pdf'
};

const projectData = [
  {
    title: 'ExitLens',
    type: 'AI-Powered User Behavior Analytics Platform',
    live: 'https://exitlens-app.onrender.com',
    github: 'https://github.com/Anas2694/ExitLens',
    demo: {
      email: 'mohdviquaruddin.is23@bmsce.ac.in',
      password: 'Anas_2004'
    },
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API', 'JWT', 'Render'],
    summary:
      'A SaaS analytics platform with a lightweight tracking script for clicks, scroll depth, rage clicks, dead clicks, bounce sessions, heatmaps, and AI-generated UX insights.'
  },
  {
    title: 'PostVisit',
    type: 'AI-Powered Healthcare Platform',
    live: 'https://postvisit-healthcare.onrender.com',
    github: 'https://github.com/Anas2694/PostVisit-healthcare',
    demo: {
      email: 'mohdviquaruddin.is23@bmsce.ac.in',
      password: 'Anas_2004'
    },
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Gemini API', 'Cloudinary', 'Chart.js', 'EJS'],
    summary:
      'An end-to-end health intelligence system that reads medical reports, extracts key health indicators, explains results in plain English, and tracks metrics over time.'
  },
  {
    title: 'UrbanStay',
    type: 'Full-Stack Vacation Rental Platform',
    live: 'https://urbanstay-81ly.onrender.com',
    github: 'https://github.com/Anas2694',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Mapbox API', 'Cloudinary', 'Passport.js', 'Brevo'],
    summary:
      'An Airbnb-inspired rental platform for discovering, listing, reviewing, and booking stays with map search, image uploads, authentication, booking history, and email confirmations.'
  }
];

const MessageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/profile', (_req, res) => {
  res.json({ profile, projects: projectData });
});

app.post('/api/contact', async (req, res) => {
  console.log('CONTACT ROUTE HIT');
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required.'
      });
    }

    const payload = {
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim()
    };

    if (!payload.name || !payload.email || !payload.message) {
      return res.status(400).json({
        error: 'Name, email, and message are required.'
      });
    }

    if (!isValidEmail(payload.email)) {
      return res.status(400).json({
        error: 'Please enter a valid email address.'
      });
    }

    // Save to MongoDB
    if (mongoose.connection.readyState === 1) {
      await Message.create(payload);
    } else {
      contactMessages.push({
        ...payload,
        createdAt: new Date().toISOString()
      });
    }

    const info = await sendBrevoEmail({
      subject: `New Portfolio Message from ${payload.name}`,
      htmlContent: buildContactEmail(payload),
      textContent: buildContactText(payload),
      replyTo: {
        name: payload.name,
        email: payload.email
      }
    });

    console.log('Brevo email sent:', info);

    return res.status(201).json({
      ok: true
    });

  } catch (error) {

    console.error('Contact form failed:', getBrevoErrorDetails(error));

    return res.status(500).json({
      error: 'Failed to send message',
      details: process.env.NODE_ENV === 'production' ? undefined : getBrevoErrorDetails(error)
    });
  }
});

app.get('/ping', (_req, res) => {
  res.send('SERVER WORKING');
});

app.get(['/api/test-email', '/test-email'], async (_req, res) => {

  try {

    const info = await sendBrevoEmail({
      subject: 'Brevo Transactional Email Test',
      textContent: 'Brevo transactional email is working successfully.',
      htmlContent: '<p>Brevo transactional email is working successfully.</p>'
    });

    console.log('Brevo test email sent:', info);

    res.json({
      success: true,
      info
    });

  } catch (error) {

    console.error('Brevo test email failed:', getBrevoErrorDetails(error));

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send test email',
      details: getBrevoErrorDetails(error)
    });
  }

});

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.warn('MongoDB connection skipped:', error.message));
}

const distPath = path.resolve(__dirname, '..', 'dist');
if (!process.env.VERCEL && process.env.NODE_ENV === 'production' ) {
  app.use(express.static(distPath));
  app.get(/.*/, (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Portfolio API running on http://localhost:${port}`);
  });
}

export default app;
