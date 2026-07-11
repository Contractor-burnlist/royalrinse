export type Review = { name: string; text: string; vehicle?: string };

/** Real customer reviews. Text is verbatim — do not edit or embellish. */
export const featuredReviews: Review[] = [
  {
    name: "Ashley Hoang",
    vehicle: "Subaru BRZ",
    text: "Royal Rinse did a phenomenal job on my Subaru BRZ. The car is tiny and I have dogs, their fur could be everywhere on the alcantara seats that I never could completely remove. I had my car detailed before and it wasn't done right, so I just accepted the fact that those puppy sprinkles couldn't be completely removed. Luckily I found Royal Rinse. Will keep booking them from now on.",
  },
  {
    name: "Sol Jackson",
    vehicle: "Mercedes Sprinter Van",
    text: "I own a luxury Mercedes Sprinter van. This week I had it detailed with a ceramic coating. The crew was prompt, professional, and did a 5-star job. Now I'm proud to have my family travel cross country with a very clean ride. I highly recommend! Great job!",
  },
  {
    name: "Angela S.",
    vehicle: "Porsche",
    text: "Best mobile detailer by far! Andre was on time, super friendly, and did a fantastic job on my Porsche. He had it done by the time he promised. I will definitely be recommending him to family and friends.",
  },
];
