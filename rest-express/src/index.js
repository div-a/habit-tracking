const express = require("express");
const { PrismaClient } = require("@prisma/client");
var cors = require('cors')

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use(cors())

app.post(`/signup`, async (req, res) => {
  const { name, email, posts } = req.body;

  const postData = posts
    ? posts.map((post) => {
      return { title: post.title, content: post.content || undefined };
    })
    : [];

  const result = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
    },
  });
  res.json(result);
});


app.post(`/habit`, async (req, res) => {
  const { name, numDaysToComplete, authorEmail, schedule } = req.body;
  const result = await prisma.habit.create({
    data: {
      name,
      numDaysToComplete,
      author: { connect: { email: authorEmail } }
    },
  });

  const scheduleDayRes = await prisma.scheduleDay.createMany({
    data: [
      { day: 4, habitId: result },
      { day: 1, habitId: result },
    ],
    skipDuplicates: true,
  });

  res.json(result);
});

app.delete(`/habit/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.habit.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(post);
});

app.get("/habits", async (req, res) => {
  const habits = await prisma.habit.findMany();
  res.json(habits);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post(`/completionRecord`, async (req, res) => {
  const { habitId } = req.body;
  const result = await prisma.completionRecord.create({
    data: {
      habitId,
    },
  });
  res.json(result);
});

const server = app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
