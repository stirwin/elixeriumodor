import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse){
    await(await draftMode()).disable();
    return NextResponse.redirect(new URL("/", request.url));
    
}