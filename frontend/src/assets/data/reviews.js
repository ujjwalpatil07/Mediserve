const patientReviews = [
  {
    name: "Anita Sharma",
    photo:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "I had been suffering from chronic pain for years and was hesitant to seek help. But thanks to the doctor’s patient approach and expert treatment, I feel like I have a new life. I can finally move without pain and enjoy time with my family again.",
    rating: 5,
  },
  {
    name: "Priya Mehta",
    photo:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "After my surgery, I was anxious about the recovery. But the follow-up support and guidance I received through the platform were excellent. I always felt like I had someone to turn to with questions. Very satisfied!",
    rating: 4,
  },
  {
    name: "Sandeep Kumar",
    photo:
      "https://images.pexels.com/photos/3775536/pexels-photo-3775536.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "Being able to find a highly-rated specialist nearby saved me so much time. I appreciated the transparency, the ratings, and the ability to choose according to my preferences. My consultation was professional and reassuring.",
    rating: 5,
  },
  {
    name: "Neha Reddy",
    photo:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "From diagnosis to treatment and follow-ups, everything was handled very smoothly. I always felt informed and confident. The convenience of the platform combined with such good care is truly a blessing for patients like me.",
    rating: 4,
  },
  {
    name: "Arjun Patel",
    photo:
      "https://images.pexels.com/photos/1832323/pexels-photo-1832323.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "I used to dread hospital visits, but this platform changed everything. I could book appointments without endless calls, and the doctor was very understanding. Highly recommend to anyone needing medical help quickly.",
    rating: 5,
  },
  {
    name: "Meena Joshi",
    photo:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "The entire process was so smooth, from booking to post-treatment care. The doctor explained every step in detail, and I felt completely at ease. It’s rare to find such kind and qualified professionals these days.",
    rating: 5,
  },
  {
    name: "Karan Verma",
    photo:
      "https://images.pexels.com/photos/2918529/pexels-photo-2918529.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "I was skeptical at first, but the results were beyond my expectations. The doctor took the time to understand my problem and offered a treatment plan that actually worked. I feel healthier and happier now.",
    rating: 4,
  },
  {
    name: "Ruchi Pandey",
    photo:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "My skin condition had been bothering me for years. Thanks to this platform, I found a dermatologist who finally gave me the right diagnosis and treatment. It has boosted my confidence immensely.",
    rating: 5,
  },
  {
    name: "Rajeev Saxena",
    photo:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "Excellent experience overall. I was able to book a consultation for my elderly father without any trouble. The doctor was kind and made my father feel very comfortable. Thank you for such thoughtful service.",
    rating: 4,
  },
  {
    name: "Divya Malhotra",
    photo:
      "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "My daughter needed urgent pediatric care, and this service connected me to a specialist in no time. The doctor was thorough and professional, and the advice helped us avoid an ER visit. Truly a life-saver!",
    rating: 5,
  },
  {
    name: "Amitabh Chauhan",
    photo:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "I’ve used this platform multiple times now. Whether it’s general consultation or specialist care, the service is always reliable and the quality is excellent. It’s made accessing healthcare much easier for my family.",
    rating: 5,
  },
  {
    name: "Sneha Kapoor",
    photo:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "The aftercare support is what really impressed me. I never felt alone or unsure after my treatment. The team followed up and the doctor answered all my questions with patience and clarity. Highly recommended!",
    rating: 5,
  },
  {
    name: "Harshad Nair",
    photo:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "I appreciated the transparency of reviews and ratings for each doctor. I felt empowered to choose the right one for my issue. The appointment was on time and the doctor explained everything very well.",
    rating: 4,
  },
  {
    name: "Kavita Rao",
    photo:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "I’ve been using the platform for myself and my parents. It’s user-friendly and well-designed. I especially love the reminders and follow-ups. They truly care about patient experience from start to finish.",
    rating: 5,
  },
  {
    name: "Yash Thakur",
    photo:
      "https://images.pexels.com/photos/1832323/pexels-photo-1832323.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "Timely appointments and professional service. What more could I ask for? I found a good ENT doctor within minutes, and the entire visit went smoothly. Great for busy working professionals like me.",
    rating: 4,
  },
  {
    name: "Radhika Sen",
    photo:
      "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "I was looking for mental health support and found a compassionate counselor here. The sessions helped me more than I could have imagined. So grateful for this platform and the care I received.",
    rating: 5,
  },
  {
    name: "Vikram Joshi",
    photo:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "I had a dental emergency, and this service got me help within an hour. The dentist was professional and skilled. It was my first time using an online platform for health, and I’m truly impressed.",
    rating: 4,
  },
  {
    name: "Pooja Mishra",
    photo:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "I was nervous about online consultations, but the experience was smooth and reassuring. The doctor took time to explain the condition and prescribed effective treatment. I’ll definitely use this again.",
    rating: 5,
  },
  {
    name: "Manoj Agarwal",
    photo:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=100",
    review:
      "This platform brings quality healthcare within reach. I no longer have to wait in long lines or travel far. My issue was resolved quickly and professionally. Great initiative and highly needed.",
    rating: 5,
  },
];

export default patientReviews;
