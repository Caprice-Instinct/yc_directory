import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "John Doe" },
      _id: 1,
      description: "This is the description",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGAEsWIViVxbfUAoET5lGjTmHzJsQ7-ovwYw&s",
      category: "This is the category",
      title: "This is the title",
    },
    {
      _createdAt: new Date(),
      views: 120,
      author: { _id: 2, name: "Alice Smith" },
      _id: 2,
      description: "Exploring the beauty of nature through photography.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGAEsWIViVxbfUAoET5lGjTmHzJsQ7-ovwYw&s",
      category: "Photography",
      title: "Capturing Nature's Wonders",
    },
    {
      _createdAt: new Date(),
      views: 85,
      author: { _id: 3, name: "Michael Brown" },
      _id: 3,
      description: "A deep dive into the latest advancements in AI.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGAEsWIViVxbfUAoET5lGjTmHzJsQ7-ovwYw&s",
      category: "Technology",
      title: "The Future of Artificial Intelligence",
    },
  ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
