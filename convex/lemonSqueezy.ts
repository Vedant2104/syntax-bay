"use node"
import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { createHmac, verify } from "crypto";


const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET! ;

// console.log(webhookSecret);

function verifySignature(payload: string, signature: string): boolean {
    const hmac = createHmac("sha256", webhookSecret);
    const computedSignature = hmac.update(payload).digest("hex");

    // console.log("Received signature:", signature.slice(0, 10), "...", signature.length);
    // console.log("Computed signature:", computedSignature.slice(0, 10), "...", computedSignature.length);



    return signature === computedSignature;
  }

export const verifyWebhook = internalAction({
    args:{
        payload : v.string(),
        signature : v.string()
    },
    handler : async (ctx , args) =>{
        const isValid = verifySignature(args.payload, args.signature);

        if(!isValid){
            throw new Error("Invalid signature");
        }

        return JSON.parse(args.payload)
    }
})