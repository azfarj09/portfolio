"use client"

import { useMemo, useState } from "react"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Modal } from "@/components/modal"
import { Reveal } from "@/components/reveal"
import { useLiveAge } from "@/components/live-age"
import { replaceAgeInText } from "@/lib/utils"
import rawBlogPosts from "./blog.json"

const formatDate = (dateString: string) => {
  // Parse the date string manually to avoid timezone issues
  const [year, month, day] = dateString.split("-").map(Number)
  const date = new Date(year, month - 1, day) // month is 0-indexed
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function PostMeta({ date, readTime }: { date: string; readTime: string }) {
  return (
    <div className="meta">
      <span>
        <Calendar />
        {formatDate(date)}
      </span>
      <span>
        <Clock />
        {readTime}
      </span>
    </div>
  )
}

export function Blog({ age: initialAge }: { age: number }) {
  const age = useLiveAge(initialAge)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const [showAllPosts, setShowAllPosts] = useState(false)

  // Process blog posts to replace age dynamically
  const blogPosts = useMemo(
    () =>
      rawBlogPosts.map((post) => ({
        ...post,
        excerpt: replaceAgeInText(post.excerpt, age),
        content: post.content.map((paragraph) => replaceAgeInText(paragraph, age)),
      })),
    [age],
  )

  const selectedPost = blogPosts.find((post) => post.id === selectedPostId) ?? null

  return (
    <section id="blog" className="section" aria-labelledby="blog-heading">
      <div className="wrap">
        <Reveal as="header" className="sec-head">
          <p className="eyebrow">
            <span className="eyebrow__num">03</span>
            Blog
          </p>
          <h2 id="blog-heading" className="sec-title">
            Latest <em>Posts</em>
          </h2>
          <p className="sec-intro">
            Sharing my coding journey, lessons learned, and insights from building projects as a young developer.
          </p>
        </Reveal>

        <div className="posts">
          {blogPosts.map((post) => (
            <Reveal as="article" key={post.id} className={`post${post.featured ? " post--featured" : ""}`}>
              <div className="post__media">
                <img src={post.image || "/placeholder.svg"} alt={post.title} loading="lazy" />
                {post.featured && <span className="chip">Featured</span>}
              </div>

              <PostMeta date={post.date} readTime={post.readTime} />
              <h3 className="post__title">{post.title}</h3>
              <p className="post__excerpt">{post.excerpt}</p>

              <ul className="tags">
                {post.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <button type="button" className="post__more" onClick={() => setSelectedPostId(post.id)}>
                Read More
                <ArrowRight />
              </button>
            </Reveal>
          ))}

          <Reveal className="posts__all">
            <button type="button" className="btn btn--ghost" onClick={() => setShowAllPosts(true)}>
              View All Posts
              <ArrowRight />
            </button>
          </Reveal>
        </div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <Modal label={selectedPost.title} onClose={() => setSelectedPostId(null)}>
          <div className="article__hero">
            <img src={selectedPost.image || "/placeholder.svg"} alt={selectedPost.title} />
            {selectedPost.featured && <span className="chip">Featured</span>}
          </div>

          <div className="article__body">
            <PostMeta date={selectedPost.date} readTime={selectedPost.readTime} />
            <h2 className="article__title">{selectedPost.title}</h2>

            <ul className="tags">
              {selectedPost.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <p className="article__lead">{selectedPost.excerpt}</p>
            <div className="article__content">
              {selectedPost.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="article__foot">
              <button type="button" className="btn btn--primary" onClick={() => setSelectedPostId(null)}>
                Close Article
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* View All Posts Modal */}
      {showAllPosts && (
        <Modal label="All Blog Posts" size="wide" onClose={() => setShowAllPosts(false)}>
          <div className="allposts">
            <div className="allposts__head">
              <h2 className="allposts__title">All Blog Posts</h2>
              <p className="allposts__count">
                {blogPosts.length} post{blogPosts.length !== 1 ? "s" : ""} available
              </p>
            </div>

            <div className="allposts__grid">
              {blogPosts.map((post) => (
                <button
                  type="button"
                  key={post.id}
                  className="mini"
                  onClick={() => {
                    setShowAllPosts(false)
                    setSelectedPostId(post.id)
                  }}
                >
                  <img src={post.image || "/placeholder.svg"} alt="" />
                  {post.featured && <span className="chip">Featured</span>}

                  <span className="mini__body">
                    <span className="meta">
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readTime}</span>
                    </span>
                    <span className="mini__title">{post.title}</span>
                    <span className="mini__excerpt">{post.excerpt}</span>
                    <span className="mini__tags">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                      {post.tags.length > 2 && <span>+{post.tags.length - 2}</span>}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="allposts__foot">
              <p>More posts coming soon! Stay tuned for updates on my coding journey.</p>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setShowAllPosts(false)}>
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  )
}
