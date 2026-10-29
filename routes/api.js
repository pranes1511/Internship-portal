
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

const internships = [
  {
    id: 'web-development',
    title: 'Web Development Intern',
    company: 'TechNova',
    location: 'Remote',
    duration: '3 months',
    stipend: '₹8,000/month',
    description: 'Build responsive web applications using modern web technologies.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics Intern',
    company: 'DataSphere',
    location: 'Chennai',
    duration: '2 months',
    stipend: '₹7,000/month',
    description: 'Analyze datasets and create reports to discover business insights.',
    skills: ['Python', 'SQL', 'Excel', 'Data Visualization'],
  },
  {
    id: 'backend-development',
    title: 'Backend Development Intern',
    company: 'CodeCraft',
    location: 'Hybrid',
    duration: '3 months',
    stipend: '₹10,000/month',
    description: 'Build REST APIs and work with databases and server-side applications.',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Intern',
    company: 'PixelWorks',
    location: 'Remote',
    duration: '2 months',
    stipend: '₹6,000/month',
    description: 'Design user-friendly interfaces and interactive prototypes.',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'UI Design'],
  },
];

router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Internship Portal API is running' });
});

router.get('/internships', (req, res) => {
  res.json(internships);
});

router.get('/internships/:id', (req, res) => {
  const internship = internships.find(item => item.id === req.params.id);

  if (!internship) {
    return res.status(404).json({ error: 'Internship not found' });
  }

  res.json(internship);
});

router.post('/applications', async (req, res) => {
  try {
    const { studentName, email, rollNumber, internship } = req.body;

    if (
      typeof studentName !== 'string' || studentName.trim().length < 2 ||
      typeof email !== 'string' ||
      typeof rollNumber !== 'string' || !rollNumber.trim() ||
      typeof internship !== 'string'
    ) {
      return res.status(400).json({
        error: 'Please provide a valid name, email, roll number, and internship.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email.' });
    }

    const selected = internships.find(item => item.id === internship);

    if (!selected) {
      return res.status(400).json({ error: 'Please select a valid internship.' });
    }

    const application = await Application.create({
      studentName: studentName.trim(),
      email: normalizedEmail,
      rollNumber: rollNumber.trim(),
      internship: selected.id,
    });

    res.status(201).json({
      message: 'Application submitted successfully!',
      application: {
        ...application.toObject(),
        internshipTitle: selected.title,
        company: selected.company,
      },
    });
  } catch (error) {
    console.error('Application submission error:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Unable to submit application.' });
  }
});

router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json(applications.map(application => {
      const selected = internships.find(
        item => item.id === application.internship
      );

      return {
        ...application,
        internshipTitle: selected?.title || application.internship,
        company: selected?.company || 'Unknown company',
      };
    }));
  } catch (error) {
    console.error('Application retrieval error:', error);
    res.status(500).json({ error: 'Unable to retrieve applications.' });
  }
});

module.exports = router;
