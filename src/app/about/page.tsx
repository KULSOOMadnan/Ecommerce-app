import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] bg-adfok flex items-center justify-center text-white">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            About{" "}
            <span className="text-4xl md:text-6xl tracking-wide">ADFOK</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Your one-stop destination for fashion and accessories that define
            your style.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-8 md:px-16 lg:px-32">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Mission</h2>
        <p className="text-lg leading-relaxed text-center">
          At Adfok, our mission is to make high-quality, trendy fashion
          accessible to everyone. We aim to bring the latest styles to your
          doorstep while delivering exceptional customer service.
        </p>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Why Shop with Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-16 lg:px-32">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            {/* <Image src="/quality.svg" alt="Quality Products" width={80} height={80} className="mx-auto mb-4" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              className="mx-auto mb-4"
            >
              <rect width="24" height="24" fill="none" />
              <path
                fill="#F35C7A"
                d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91c4.59-1.15 8-5.86 8-10.91V5zm-1.06 13.54L7.4 12l1.41-1.41l2.12 2.12l4.24-4.24l1.41 1.41z"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              Offering the finest materials and craftsmanship for every item.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              className="mx-auto mb-4"
            >
              <rect width="24" height="24" fill="none" />
              <path
                fill="#F35C7A"
                d="M20 8h-3V4H1v13h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5M15 7h-2v7h-2V7H9v7H7V7H5v7H3V6h12zm3 11.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5M17 12V9.5h2.5l1.96 2.5z"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2">Fast Shipping</h3>
            <p className="text-gray-600">
              Enjoy quick and reliable delivery to your doorstep.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 14 14"
              className="mx-auto mb-4"
            >
              <rect width="14" height="14" fill="none" />
              <path
                fill="#F35C7A"
                fill-rule="evenodd"
                d="M6.987 1.5A3.18 3.18 0 0 0 3.75 4.628V9a1 1 0 0 1-1 1H1.5A1.5 1.5 0 0 1 0 8.5v-2A1.5 1.5 0 0 1 1.5 5h.75v-.39A4.68 4.68 0 0 1 7 0a4.68 4.68 0 0 1 4.75 4.61V5h.75A1.5 1.5 0 0 1 14 6.5v2a1.5 1.5 0 0 1-1.5 1.5h-.75v.5a2.75 2.75 0 0 1-2.44 2.733A1.5 1.5 0 0 1 8 14H6.5a1.5 1.5 0 0 1 0-3H8c.542 0 1.017.287 1.28.718a1.25 1.25 0 0 0 .97-1.218V4.627A3.18 3.18 0 0 0 6.987 1.5"
                clip-rule="evenodd"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our team is here to assist you at every step of your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
       <section className="py-16 px-8 md:px-16 lg:px-32 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <Image src="https://img.freepik.com/premium-photo/stylish-woman-autumn-park_95125-527.jpg?ga=GA1.1.1882841055.1730029897&semt=ais_hybrid" alt="Team Member 1" width={100} height={100} className="rounded-full h-[150px] mx-auto mb-4" />
            <h3 className="text-xl font-medium">Kulsoom Adnan</h3>
            <p className="text-gray-600">Founder & CEO</p>
            <p className="text-gray-500 mt-2">Driving the vision and growth of Adfok in the e-commerce domain.</p>
          </div>
          <div className="text-center">
            <Image src="https://img.freepik.com/free-photo/young-beautiful-girl-posing-black-leather-jacket-park_1153-8104.jpg?ga=GA1.1.1882841055.1730029897&semt=ais_hybrid" alt="Team Member 2" width={100} height={100} className="rounded-full h-[150px]  object-cover mx-auto mb-4" />
            <h3 className="text-xl font-medium"> Mahnoor Adnan</h3>
            <p className="text-gray-600">CTO</p>
            <p className="text-gray-500 mt-2">Leading technology innovations for a seamless shopping experience.</p>
          </div>
          <div className="text-center">
            <Image src="https://img.freepik.com/free-photo/handsome-guy-sweater_144627-13026.jpg?ga=GA1.1.1882841055.1730029897&semt=ais_hybrid" alt="Team Member 3" width={100} height={100} className="rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-medium">Huzaifa Adnan</h3>
            <p className="text-gray-600">Marketing Head</p>
            <p className="text-gray-500 mt-2">Crafting strategies to connect Adfok&apos;s brand with customers worldwide.</p>
          </div>
        </div>
      </section>


      {/* Call to Action Section */}
      <section className="py-16 bg-adfok text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Explore Our Collection</h2>
        <p className="text-lg mb-6">
          Discover the latest trends and find the perfect accessories to
          complement your style.
        </p>
        <button className="px-6 py-3 bg-white text-adfok font-medium rounded shadow-lg">
          Browse Products
        </button>
      </section>
    </div>
  );
}
