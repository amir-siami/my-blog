const Page = () => {
  return (
    <section className="mt-24">
      <div className="relative z-10 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-200 mb-10 tracking-tight font-normal">
          Welcome to My Blog!
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-primary-900 tracking-wide mb-10 font-normal w-[90%] sm:w-[70%] md:w-[60%] mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum tempore
          suscipit rem nam architecto magni fuga ex accusantium id, aliquam ab
          rerum impedit. Sapiente doloremque ratione culpa reprehenderit tenetur
          repudiandae maxime quam veniam ducimus at, fuga similique, obcaecati
          laboriosam nihil, ad dolorum!
        </p>
        <a
          href="/blog"
          className="bg-primary-500 rounded px-8 py-6 text-accent-200 text-lg font-semibold hover:bg-primary-600 transition-all"
        >
          Explore our blogs
        </a>
      </div>
    </section>
  );
};

export default Page;
