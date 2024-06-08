import { News } from "../models/news.model.js";
import { createClient } from "redis";
import io from "../index.js";

// Initialize and connect to the Redis server
const redisClient = createClient();
redisClient.connect().catch(console.error);

export async function showNews(req, res) {
  try {
    // Fetch the latest news items from the database
    const latestNews = await News.find().sort({ _id: -1 }).exec();
    if (latestNews.length === 0) {
      return res.status(404).json({ message: "No news found" });
    }
    return res.status(200).json({
      latestNews,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

export async function createNews(req, res) {
  try {
    const { title, description } = req.body;
    const news = new News({
      title,
      description,
    });
    await news.save();
    const message = JSON.stringify({ action: "create", news });
    // Publish the create event to the 'news' channel on Redis
    await redisClient.publish("news", message);
    // Emit the created news to all connected users
    io.emit("newsUpdate", JSON.parse(message));
    res.status(201).json({ message: "News created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function updateNews(req, res) {
  try {
    const newsId = req.params.newsId;
    const { title, description } = req.body;

    const updatedFields = {};

    // Update only specified fields
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;

    const updatedNews = await News.findByIdAndUpdate(newsId, updatedFields, {
      new: true, // Return the updated document
    });
    // Publish the update event to the 'news' channel on Redis
    redisClient.publish(
      "news",
      JSON.stringify({ action: "update", updatedNews })
    );
    // Emit the updated news to all connected users
    io.emit("newsUpdate", { action: "update", news: updatedNews });

    if (!updatedNews) {
      return res.status(204).json({ message: "News not found" });
    }

    res.status(200).json({ message: "News updated successfully", updatedNews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteNews(req, res) {
  try {
    const newsId = req.params.newsId;
    const news = await News.findByIdAndDelete(newsId);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    // Publish the deletion event to the 'news' channel on Redis
    redisClient.publish("news", JSON.stringify({ action: "delete", news }));
    // Emit the news deletion to all connected users
    io.emit("newsUpdate", { action: "delete", newsId });
    return res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
