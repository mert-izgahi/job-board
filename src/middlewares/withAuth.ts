export async function withAuth(req: any, res: any, next: any) {
  try {
    
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ message: error.message });
    } else {
      return res.status(401).json({ message: "Something went wrong" });
    }
  }
}
