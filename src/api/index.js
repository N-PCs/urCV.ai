const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage for reviews
let reviews = [
    {
        id: 1,
        name: "James Wilson",
        role: "Senior Software Engineer",
        content: "The AI suggestions were incredibly sharp. I updated my CV in 20 minutes and landed three interviews within a week. Truly game-changing!",
        rating: 5,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAvUv0eyoA-ZXxJWYZXpZq67cIND-5CbhulMPoZn6MFXZddJXT6bWI30tIglG_NGmmxb3B2kDOc9e_BLp3inZOn5YglOQEjdYd7IkU70c75zbf73VVfwFs-PikxazQY5xSee_SreoihXNpQqDvFfmFCyHlwus526U_w_F-vtev0SkVZS4qA4qKIRF2R4YR0dqEf9wPYGmJyHUGe6d06yx7D7ZwLH-b4OHppj4dpZNuQI1W98UHA5BaVlwOskt6kBM8eKid2ihJBZGe"
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Product Manager at TechFlow",
        content: "I used to struggle with formatting and 'selling' my achievements. urCV.ai did the heavy lifting for me. I couldn't be happier with the result.",
        rating: 5,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAx-OydoAlD4-xxIPEnlMZEdQw02Qsp6bgD5jcPx5vcmLcBFZC59XokI0-axaMWzDXhx-S7gJclaIn5BffY30Ng1GaQXYnRhzUlA2V-Iw_nimijAMVyGIwRsxo8CdvIuFMA6OZ4uLTiDMz-_Xo_Bv2Ylk5epFsF58rNDzg5iw360iMB7IdEC42bjAZEPqdrV6DpfKiS1VmkMEYvvdtfFWGbMS-UrBe23L1UT6CMLSLikG972vnuMO82zkWR1HssEfvOCB_3huHSG7vf"
    },
    {
        id: 3,
        name: "David Chen",
        role: "UX Designer",
        content: "As a creative, design matters to me. The templates here are modern, elegant, and actually work with ATS systems. Highly recommended!",
        rating: 5,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVY6asm1ZWR08DqV4fzbFeNJQ_BUCN-X4D-wG9vZ9efMaiAOdO04IYFSomwlCqFe43GfonOMD6DA7BcWYcGXgzqWYCB-5tjfH0vWeBRO1cGlP_9OcO8zR-QkbOQXdMPX1foRASGDmgAzsk1iJofT8U9uMmWk6UvKemdPo6ggMehfejpSv2TeEb-33HPPcVBzf9bw7ByD-z0IyGSST8defv6q_tWkMzqQrvw877ozVTRoUl2KzRaWCIywlx4Us0W67YglEwMM4KTaFU"
    }
];

// Get all reviews
app.get('/api/reviews', (req, res) => {
    res.json(reviews);
});

// Submit a new review
app.post('/api/reviews', (req, res) => {
    const { name, role, content, rating } = req.body;

    if (!name || !content || !rating) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newReview = {
        id: reviews.length + 1,
        name,
        role: role || "Job Seeker",
        content,
        rating,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };

    // Add to beginning of array so it shows up first
    reviews.unshift(newReview);

    res.status(201).json(newReview);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
