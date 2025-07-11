import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { sub } from "framer-motion/client";


export const createSnippet = mutation({
    args:{
        title:v.string(),
        language:v.string(),
        code:v.string()
    },
    handler: async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Not authenticated");

        const user = await ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), identity.subject)).first();

        if(!user) throw new Error("User not found");

        const snippetId = await ctx.db.insert("snippets",{
            userId : user.userId,
            userName: user.name,
            title : args.title,
            language : args.language,
            code : args.code
        })

        return snippetId;
    }
})

export const getSnippets = query({
    handler : async (ctx) =>{
        const snippets = await ctx.db.query("snippets").order("desc").collect();
        return snippets;
    }
})

export const getSnippetById = query({
    args:{
        snippetId : v.id("snippets")
    },
    handler: async (ctx , args) => {
        const snippet = await ctx.db.get(args.snippetId);
        if(!snippet) throw new Error("Snippet not found");
        return snippet;
    }
})

export const getComments = query({
    args : {
        snippetId : v.id("snippets")
    },
    handler: async (ctx , args) => {
        const comments = await ctx.db.query("snippetComments").withIndex("by_snippet_id").filter((q) => q.eq(q.field("snippetId"), args.snippetId)).order("desc").collect();
        
        return comments;
    }
})

export const addComments = mutation({
    args : {
        snippetId : v.id("snippets"),
        content : v.string()
    },
    handler: async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Not authenticated");

        const user = await ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), identity.subject)).first();

        if(!user) throw new Error("User not found");

        const commentId = await ctx.db.insert("snippetComments",{
            userId : identity.subject, 
            userName : user.name,
            snippetId : args.snippetId,
            content : args.content
        })

        return commentId;
    }
})


export const deleteComment = mutation({
    args : {
        commentId : v.id("snippetComments")
    },
    handler: async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Not authenticated");

        const comment = await ctx.db.get(args.commentId);

        if(!comment) throw new Error("Comment not found");

        if(comment.userId !== identity.subject) throw new Error("Unauthorized");

        await ctx.db.delete(args.commentId);

        return;
    }
})

export const deleteSnippet = mutation({
    args : {
        snippetId : v.id("snippets")
    },
    handler: async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Not authenticated");

        const snippet = await ctx.db.get(args.snippetId);

        if(!snippet) throw new Error("Snippet not found");

        if(snippet.userId !== identity.subject) throw new Error("Unauthorized");

        const comments = await ctx.db.query("snippetComments").withIndex("by_snippet_id").filter((q) => q.eq(q.field("snippetId"), args.snippetId)).collect();

        for(const comment of comments){
            await ctx.db.delete(comment._id);
        }

        const stars = await ctx.db.query("stars").withIndex("by_snippet_id").filter((q) => q.eq(q.field("snippetId"), args.snippetId)).collect(); 

        for(const star of stars){
            await ctx.db.delete(star._id);
        }

        await ctx.db.delete(args.snippetId);
    }
})

export const isSnippetStarred = query({
    args : {
        snippetId : v.id("snippets")
    },
    handler: async (ctx , args) =>{
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) return false;

        const star = await ctx.db.query("stars").withIndex("by_user_and_snippet").filter((q) => q.eq(q.field("userId"), identity.subject) && (q.eq(q.field("snippetId"), args.snippetId))).first();

        return !!star;
    }
})

export const starSnippet = mutation({
    args:{
        snippetId : v.id("snippets")
    },
    handler: async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Not authenticated");

        const existing = await ctx.db.query("stars").withIndex("by_user_and_snippet").filter((q) => q.eq(q.field("userId"), identity.subject) && (q.eq(q.field("snippetId"), args.snippetId))).first();

        if(existing){
            await ctx.db.delete(existing._id);
        }else{
            await ctx.db.insert("stars",{
                userId : identity.subject,
                snippetId : args.snippetId
            })
        }
    }
})

export const getSnippetStarCount = query({
    args : {
        snippetId : v.id("snippets")
    },
    handler : async (ctx , args) => {
        const stars = await ctx.db.query("stars").withIndex("by_snippet_id").filter((q) => q.eq(q.field("snippetId"), args.snippetId)).collect();
    
        return stars.length;
    }
})

export const getStarredSnippets = query({
    handler : async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){ throw new Error("Not authenticated");}

        const stars = await ctx.db.query("stars").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), identity.subject)).collect();

        const snippets = await Promise.all(stars.map((star) => ctx.db.get(star.snippetId)));

        return snippets.filter((snippet) => snippet != null);
    }
    
})
