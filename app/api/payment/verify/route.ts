import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore"

export async function POST(req: NextRequest) {
  try {
    const { transaction_id, plan, userId } = await req.json()

    if (!transaction_id || !plan || !userId) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const secretKey = process.env.FLUTTERWAVE_SECRET_KEY

    if (!secretKey) {
      console.error("FLUTTERWAVE_SECRET_KEY is not configured")
      return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 })
    }

    // 1. Verify with Flutterwave
    const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${secretKey}`,
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()

    if (data.status === "success" && data.data.status === "successful") {
      // 2. Calculate end date (30 days from now for monthly subscription)
      const startDate = new Date()
      const endDate = new Date()
      endDate.setDate(startDate.getDate() + 30)

      // 3. Update User in Firestore
      // Using client SDK in server route is possible if initialized correctly
      const userRef = doc(db, "users", userId)
      await setDoc(userRef, {
        subscription: {
          plan,
          status: "active",
          startDate: Timestamp.fromDate(startDate),
          endDate: Timestamp.fromDate(endDate),
          transactionId: transaction_id
        },
        lastUpdated: serverTimestamp()
      }, { merge: true })

      return NextResponse.json({ 
        success: true, 
        data: {
          plan,
          status: "active",
          expiry: endDate.toISOString()
        } 
      })
    }

    return NextResponse.json({ 
      success: false, 
      error: "Payment verification failed. Please contact support if you were charged.",
      details: data
    }, { status: 400 })

  } catch (error: any) {
    console.error("Verification API error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
