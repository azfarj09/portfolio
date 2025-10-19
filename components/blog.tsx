"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, X } from "lucide-react"
import blogPosts from "./blog.json"

export function Blog() {
    const [isVisible, setIsVisible] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null)
    const [showAllPosts, setShowAllPosts] = useState(false)
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        // Small delay to ensure proper mounting
        const mountTimer = setTimeout(() => {
            setIsMounted(true)
        }, 50)

        return () => clearTimeout(mountTimer)
    }, [])

    useEffect(() => {
        if (!isMounted) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    // Add a small delay to ensure smooth animation start
                    setTimeout(() => {
                        setIsVisible(true)
                        setHasAnimated(true)
                    }, 50)
                    observer.disconnect() // Stop observing once animated
                }
            },
            { threshold: 0.15, rootMargin: '-20px' },
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [hasAnimated, isMounted])

    const formatDate = (dateString: string) => {
        // Parse the date string manually to avoid timezone issues
        const [year, month, day] = dateString.split('-').map(Number)
        const date = new Date(year, month - 1, day) // month is 0-indexed
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <section id="blog" ref={ref} className="py-32 px-6 bg-card/30">
            <div className="max-w-7xl mx-auto">
                <div className={`text-center mb-16 ${isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0"}`}>
                    <div className="text-sm text-primary font-mono uppercase tracking-wider mb-4">Blog</div>
                    <h2 className="text-4xl md:text-5xl font-bold text-balance hover:text-primary transition-colors duration-500 cursor-default">Latest Posts</h2>
                    <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
                        Sharing my coding journey, lessons learned, and insights from building projects as a young developer.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <Card
                            key={post.id}
                            className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:rotate-1 cursor-pointer ${post.featured ? 'md:col-span-2 lg:col-span-2' : ''
                                } ${isVisible ? `opacity-100 animate-scale-in-bounce` : "opacity-0"
                                }`}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.title}
                                    className={`w-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2 ${post.featured ? 'h-64' : 'h-48'
                                        }`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                {post.featured && (
                                    <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                                        Featured
                                    </div>
                                )}
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>{formatDate(post.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-2">
                                    {post.title}
                                </h3>

                                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300">
                                    {post.excerpt}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="outline"
                                            className="text-xs hover:bg-primary/20 hover:scale-110 transition-all duration-300 cursor-default"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="pt-4">
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="hover:text-primary hover:scale-105 hover:shadow-md transition-all duration-300 group/btn"
                                        onClick={() => setSelectedPost(post)}
                                    >
                                        <span>Read More</span>
                                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className={`text-center mt-12 ${isVisible ? "opacity-100 animate-fade-in-up animate-delay-800" : "opacity-0"}`}>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="hover:scale-105 transition-all duration-300"
                        onClick={() => setShowAllPosts(true)}
                    >
                        View All Posts
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>

            {/* Blog Post Modal */}
            {selectedPost && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in-bounce bg-background">
                    <div className="relative">
                        {/* Close Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 z-10 hover:bg-destructive/20"
                            onClick={() => setSelectedPost(null)}
                        >
                            <X className="h-4 w-4" />
                        </Button>

                        {/* Blog Header */}
                        <div className="relative overflow-hidden">
                            <img
                                src={selectedPost.image || "/placeholder.svg"}
                                alt={selectedPost.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            {selectedPost.featured && (
                                <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                                    Featured
                                </div>
                            )}
                        </div>

                        {/* Blog Content */}
                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(selectedPost.date)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{selectedPost.readTime}</span>
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-balance">
                                {selectedPost.title}
                            </h1>

                            <div className="flex flex-wrap gap-2">
                                {selectedPost.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                                <p className="text-lg">{selectedPost.excerpt}</p>
                                <div className="mt-6 space-y-4">
                                    {Array.isArray(selectedPost.content) ? (
                                        selectedPost.content.map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))
                                    ) : (
                                        <p>{selectedPost.content}</p>
                                    )}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border">
                                <Button 
                                    onClick={() => setSelectedPost(null)}
                                    className="hover:scale-105 transition-transform duration-300"
                                >
                                    Close Article
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            )}

            {/* View All Posts Modal */}
            {showAllPosts && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto animate-scale-in-bounce bg-background">
                        <div className="p-8">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold">All Blog Posts</h2>
                                    <p className="text-muted-foreground mt-2">
                                        {blogPosts.length} post{blogPosts.length !== 1 ? 's' : ''} available
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-destructive/20"
                                    onClick={() => setShowAllPosts(false)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Posts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {blogPosts.map((post) => (
                                    <Card
                                        key={post.id}
                                        className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                                        onClick={() => {
                                            setShowAllPosts(false)
                                            setSelectedPost(post)
                                        }}
                                    >
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={post.image || "/placeholder.svg"}
                                                alt={post.title}
                                                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            {post.featured && (
                                                <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                                                    Featured
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4 space-y-3">
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{formatDate(post.date)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{post.readTime}</span>
                                                </div>
                                            </div>

                                            <h3 className="font-semibold group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                                {post.title}
                                            </h3>

                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex flex-wrap gap-1">
                                                {post.tags.slice(0, 2).map((tag) => (
                                                    <Badge key={tag} variant="outline" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                                {post.tags.length > 2 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{post.tags.length - 2}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="mt-8 pt-6 border-t border-border text-center">
                                <p className="text-sm text-muted-foreground mb-4">
                                    More posts coming soon! Stay tuned for updates on my coding journey.
                                </p>
                                <Button 
                                    variant="outline"
                                    onClick={() => setShowAllPosts(false)}
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </section>
    )
}