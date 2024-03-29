import { Article, PrismaClient } from '@prisma/client';
import express from 'express';
import { z } from 'zod';

import { applyServerSettings } from './settings';

const app = express();
const port = 8000;

// Middlewares and settings
applyServerSettings(app);

// ↓↓↓ バックエンド処理を記述して実際に開発してみましょう！！

declare global {
  // eslint-disable-next-line no-var
  var __db__: PrismaClient | undefined;
}

const initPrisma = () => {
  if (process.env.NODE_ENV === 'production') return new PrismaClient();

  const db = (global.__db__ = global.__db__ ?? new PrismaClient());
  db.$connect();
  return db;
};

const prisma = initPrisma();

// APIのURL http://localhost:8000/admin/articles
// 作成が完了したら http://localhost:3000/admin にアクセスして確認してみましょう！
app.get('/admin/articles', async (req, res) => {
  const records = await prisma.article.findMany();

  const sorted = sortArticlesByNewestFirst(records);

  const articles = sorted.map((record) => {
    return {
      id: record.id,
      title: record.title,
      content: record.content,
      category: record.category,
      status: record.status,
      createdAt: formatDateInJa(record.createdAt),
      updatedAt: formatDateInJa(record.updatedAt),
    };
  });

  res.json({ data: articles });
});

// APIのURL http://localhost:8000/admin/articles/1
// 存在しないIDを指定した場合 http://localhost:8000/admin/articles/a -> 404 Not Found
// 作成が完了したら http://localhost:3000/admin/update/1 にアクセスして確認してみましょう！
app.get('/admin/articles/:id', async (req, res) => {
  const id = Number(req.params.id);

  const idSchema = z.number().int({
    message: 'ID 形式が不正な形式となっています',
  });

  const result = idSchema.safeParse(id);

  if (!result.success) {
    res.status(404).json({ error: { message: result.error.issues[0].message } });
    return;
  }

  const record = await prisma.article.findUnique({ where: { id } });
  if (!record) {
    res.status(404).json({ error: { message: '記事が見つかりませんでした' } });
    return;
  }

  const article = {
    id: record.id,
    title: record.title,
    content: record.content,
    category: record.category,
    status: record.status,
    createdAt: formatDateInJa(record.createdAt),
    updatedAt: formatDateInJa(record.updatedAt),
  };

  res.json({ data: article });
});

// APIのURL http://localhost:8000/admin/articles
// 作成が完了したら http://localhost:3000/admin/create にアクセスして確認してみましょう！
app.post('/admin/articles', async (req, res) => {
  const { title, content, category, status } = req.body;

  const requiredMessage = '未入力の内容があります';

  const validatedTitle = z.string().min(1, requiredMessage).safeParse(title);
  if (!validatedTitle.success) {
    res.status(400).json({ error: { message: validatedTitle.error.issues[0].message } });
    return;
  }

  const validatedContent = z.string().min(1, requiredMessage).safeParse(content);
  if (!validatedContent.success) {
    res.status(400).json({ error: { message: validatedContent.error.issues[0].message } });
    return;
  }

  const validatedCategory = z.string().min(1, requiredMessage).safeParse(category);
  if (!validatedCategory.success) {
    res.status(400).json({ error: { message: validatedCategory.error.issues[0].message } });
    return;
  }

  const validatedStatus = z.string().min(1, requiredMessage).safeParse(status);
  if (!validatedStatus.success) {
    res.status(400).json({ error: { message: validatedStatus.error.issues[0].message } });
    return;
  }

  const validatedData = {
    title: validatedTitle.data,
    content: validatedContent.data,
    category: validatedCategory.data,
    status: validatedStatus.data,
  };
  const record = await prisma.article.create({ data: validatedData });
  res.json({ data: { id: record.id.toString(10) } });
});

// APIのURL http://localhost:8000/admin/articles/:id
// 作成が完了したら http://localhost:3000/admin/update/1 にアクセスして確認してみましょう！
app.put('/admin/articles/:id', async (req, res) => {
  const { title, content, category, status } = req.body;

  const id = Number(req.params.id);

  const idSchema = z.number().int({
    message: 'ID 形式が不正な形式となっています',
  });
  const result = idSchema.safeParse(id);

  if (!result.success) {
    res.status(400).json({ error: { message: result.error.issues[0].message } });
    return;
  }

  const requiredMessage = '未入力の内容があります';

  const validatedTitle = z.string().min(1, requiredMessage).safeParse(title);
  if (!validatedTitle.success) {
    res.status(400).json({ error: { message: validatedTitle.error.issues[0].message } });
    return;
  }

  const validatedContent = z.string().min(1, requiredMessage).safeParse(content);
  if (!validatedContent.success) {
    res.status(400).json({ error: { message: validatedContent.error.issues[0].message } });
    return;
  }

  const validatedCategory = z.string().min(1, requiredMessage).safeParse(category);
  if (!validatedCategory.success) {
    res.status(400).json({ error: { message: validatedCategory.error.issues[0].message } });
    return;
  }

  const validatedStatus = z.string().min(1, requiredMessage).safeParse(status);
  if (!validatedStatus.success) {
    res.status(400).json({ error: { message: validatedStatus.error.issues[0].message } });
    return;
  }

  const validatedData = {
    title: validatedTitle.data,
    content: validatedContent.data,
    category: validatedCategory.data,
    status: validatedStatus.data,
  };
  try {
    const record = await prisma.article.update({ where: { id }, data: { ...validatedData } });

    res.json({ data: { id: record.id.toString(10) } });
  } catch {
    res.status(500).json({ error: { message: 'データベース操作に失敗しました。' } });
  }
});

// APIのURL http://localhost:8000/admin/articles/:id
// 作成が完了したら http://localhost:3000/admin などの削除ボタンをクリックしてみよう
app.delete('/admin/articles/:id', async (req, res) => {
  const id = Number(req.params.id);

  const idSchema = z.number().int({
    message: 'ID 形式が不正な形式となっています',
  });
  const result = idSchema.safeParse(id);

  if (!result.success) {
    res.status(400).json({ error: { message: result.error.issues[0].message } });
    return;
  }

  try {
    const record = await prisma.article.delete({ where: { id } });

    res.json({ data: { id: record.id.toString(10) } });
  } catch {
    res.status(500).json({ error: { message: 'データベース操作に失敗しました。' } });
  }
});

// APIのURL http://localhost:8000/articles
// 作成が完了したら http://localhost:3000 にアクセスして確認してみましょう！
app.get('/articles', async (req, res) => {
  const records = await prisma.article.findMany();

  const sorted = sortArticlesByNewestFirst(records);

  const articles = sorted.map((record) => {
    return {
      id: record.id,
      title: record.title,
      content: record.content,
      category: record.category,
      status: record.status,
      createdAt: formatDateInJa(record.createdAt),
      updatedAt: formatDateInJa(record.updatedAt),
    };
  });

  // Memo: ユーザーには公開されている記事のみを返す
  const published = articles.filter((article) => article.status === '公開');

  res.json({ data: published });
});

// APIのURL http://localhost:8000/articles/1
// 存在しないIDを指定した場合 http://localhost:8000/articles/a -> 404 Not Found
// 作成が完了したら http://localhost:3000/detail/1 にアクセスして確認してみましょう！
app.get('/articles/:id', async (req, res) => {
  const id = Number(req.params.id);

  const idSchema = z.number().int({ message: 'ID 形式が不正な形式となっています' });

  const result = idSchema.safeParse(id);

  if (!result.success) {
    res.status(404).json({ error: { message: result.error.issues[0].message } });
  }

  const record = await prisma.article.findUnique({ where: { id } });
  if (record === null) {
    res.status(404).json({ error: { message: '記事が見つかりませんでした' } });
    return;
  }

  // Memo: 公開されていない記事は 404 Not Found 扱いにする
  if (record.status !== '公開') {
    res.status(404).json({ error: { message: '記事が見つかりませんでした' } });
    return;
  }

  const article = {
    id: record.id,
    title: record.title,
    content: record.content,
    category: record.category,
    status: record.status,
    createdAt: formatDateInJa(record.createdAt),
    updatedAt: formatDateInJa(record.updatedAt),
  };

  res.json({ data: article });
});

const sortArticlesByNewestFirst = (articles: Article[]) => {
  const sorted = articles.sort((a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
  return sorted;
};
const formatDateInJa = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

// ↑↑↑ バックエンド処理を記述して実際に開発してみましょう！！

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
