import { Database, connectToDB } from "@/database";

export async function GET(request: Request) {
    const User = await connectToDB({ dbName: Database.user });
    const users = await User?.find({});
    return new Response(JSON.stringify(users));
}

// create POST request handler here which will create a new intel in the database and return the newly created intel
export async function POST(request: Request) {
    const User = await connectToDB({ dbName: Database.user });
    const { username, password, name, role } = await request.json();
    const user = await User?.create({ username, password, name, role });
    return new Response(JSON.stringify({ user }));
}
