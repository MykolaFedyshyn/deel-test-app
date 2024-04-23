export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
}

// Function to fetch user data
export async function fetchUsersData(): Promise<IUser[]> {
  const url = `https://dummyjson.com/users?limit=100`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
