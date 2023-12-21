import { Database, connectToDB } from "@/database";
import { hashSync } from "bcrypt";

export async function GET(request: Request) {
    const User = await connectToDB({ dbName: Database.user });
    const users = await User?.find({}).select("-password");
    return new Response(JSON.stringify(users));
}

export async function POST(request: Request) {
    try {
        const User = await connectToDB({ dbName: Database.user });
        const { username, password, name, role } = await request.json();
        const hashedPassword = hashSync(password, 10);
        const user = await User?.create({
            username,
            password: hashedPassword,
            name,
            role,
        });
        return new Response(JSON.stringify({ user }));
    } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
