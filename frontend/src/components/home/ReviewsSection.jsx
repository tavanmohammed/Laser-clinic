const reviews = [
    {
      name: "Swetha U.",
      text: "What a life changing treatment! I have been doing laser hair removal for almost a year now and within a few sessions I noticed a drastic improvement. The staff is caring and knowledgeable in what they do.",
    },
    {
      name: "Client Review",
      text: "I’ve had three laser treatments and found them super effective. The results have definitely been worth it. The staff are friendly, welcoming, and always make the experience comfortable.",
    },
    {
      name: "Maret K.",
      text: "I am a regular client in this beautiful clinic. I can say only positive things. The staff are truly professionals, the clinic is spotless and beautiful, and the overall experience feels luxurious.",
    },
  ];
  
  export default function ReviewsSection() {
    return (
      <section className="bg-[#f5f5f3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-28">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-[42px] md:text-[68px] leading-[1.15] text-[#555555] font-serif">
              Glowing reviews, naturally
            </h2>
  
            <p className="mt-6 text-[#4f4f4f] text-xl leading-10">
              Our success is measured by the confidence and satisfaction of our
              clients. Discover what they have to say about their journey with us.
            </p>
          </div>
  
          <div className="mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {reviews.map((review, index) => (
              <div key={index}>
                <div className="text-[#f2a482] text-3xl tracking-[4px]">★★★★★</div>
  
                <p className="mt-8 text-[#4f4f4f] text-lg leading-9">
                  {review.text}
                </p>
  
                <p className="mt-8 text-[#b9c2b0] text-2xl font-medium">
                  {review.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }