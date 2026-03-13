// src/data/mockRecipes.js
const mockRecipes = [
  {
    id: '1',
    title: 'Classic Tomato Pasta',
    description: 'A simple yet delicious pasta dish with a rich tomato sauce, perfect for a quick weeknight meal.',
    image: 'https://via.placeholder.com/400x300/FF5733/FFFFFF?text=Tomato+Pasta',
    prepTime: '15 min',
    cookTime: '25 min',
    servings: '4',
    cuisine: 'Italian',
    dietary: ['Vegetarian', 'Dairy-Free (optional)'],
    ingredients: [
      '400g spaghetti or linguine',
      '1 tbsp olive oil',
      '2 cloves garlic, minced',
      '1 can (400g) crushed tomatoes',
      '1/2 cup fresh basil, chopped',
      'Salt and black pepper to taste',
      'Parmesan cheese for serving (optional)'
    ],
    instructions: [
      'Cook spaghetti according to package directions until al dente. Reserve about 1/2 cup of pasta water before draining.',
      'While pasta cooks, heat olive oil in a large skillet over medium heat.',
      'Add minced garlic and sauté for 1 minute until fragrant, being careful not to burn it.',
      'Stir in the crushed tomatoes, salt, and pepper. Bring the sauce to a gentle simmer.',
      'Reduce heat to low and let it cook for 15-20 minutes, stirring occasionally, allowing the flavors to meld and the sauce to thicken slightly.',
      'Add the drained spaghetti to the sauce. If the sauce is too thick, add a splash of the reserved pasta water to reach desired consistency.',
      'Stir in the fresh basil. Serve hot, garnished with fresh Parmesan cheese if desired.'
    ],
    rating: 4.5
  },
  {
    id: '2',
    title: 'Chicken Stir-Fry with Vegetables',
    description: 'A quick and healthy stir-fry packed with colorful vegetables and tender chicken in a savory sauce.',
    image: 'https://via.placeholder.com/400x300/34D399/FFFFFF?text=Chicken+Stir-Fry',
    prepTime: '20 min',
    cookTime: '15 min',
    servings: '3',
    cuisine: 'Asian',
    dietary: ['Gluten-Free (use tamari)'],
    ingredients: [
      '500g chicken breast, cut into strips',
      '2 tbsp soy sauce (or tamari for GF)',
      '1 tbsp sesame oil',
      '1 tbsp cornstarch',
      '1 tbsp ginger, grated',
      '2 cloves garlic, minced',
      '1 head broccoli, chopped',
      '2 carrots, sliced',
      '1 red bell pepper, sliced',
      '1/2 onion, sliced',
      'Cooked rice for serving'
    ],
    instructions: [
      'In a bowl, combine chicken strips with 1 tbsp soy sauce, sesame oil, and cornstarch. Let marinate for 10 minutes.',
      'Heat a large wok or skillet over high heat. Add a splash of oil.',
      'Add chicken and stir-fry until cooked through and lightly browned. Remove chicken from wok and set aside.',
      'Add a little more oil to the wok if needed. Add ginger and garlic, stir-fry for 30 seconds until fragrant.',
      'Add broccoli, carrots, bell pepper, and onion. Stir-fry for 5-7 minutes until vegetables are tender-crisp.',
      'Return chicken to the wok. Add remaining 1 tbsp soy sauce. Toss to combine.',
      'Serve hot over cooked rice.'
    ],
    rating: 4.8
  },
  {
    id: '3',
    title: 'Lentil Soup',
    description: 'A hearty and nutritious vegetarian lentil soup, perfect for a cozy evening.',
    image: 'https://via.placeholder.com/400x300/60A5FA/FFFFFF?text=Lentil+Soup',
    prepTime: '10 min',
    cookTime: '40 min',
    servings: '6',
    cuisine: 'Mediterranean',
    dietary: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 tbsp olive oil',
      '1 onion, chopped',
      '2 carrots, diced',
      '2 celery stalks, diced',
      '2 cloves garlic, minced',
      '1 cup brown or green lentils, rinsed',
      '6 cups vegetable broth',
      '1 can (400g) diced tomatoes',
      '1 tsp cumin',
      '1/2 tsp dried thyme',
      'Salt and pepper to taste',
      'Fresh parsley for garnish'
    ],
    instructions: [
      'Heat olive oil in a large pot or Dutch oven over medium heat.',
      'Add onion, carrots, and celery. Sauté for 8-10 minutes until softened.',
      'Add garlic and cook for another minute until fragrant.',
      'Stir in rinsed lentils, vegetable broth, diced tomatoes, cumin, and thyme. Bring to a boil.',
      'Reduce heat, cover, and simmer for 30-35 minutes, or until lentils are tender.',
      'Season with salt and pepper to taste.',
      'Ladle into bowls and garnish with fresh parsley.'
    ],
    rating: 4.7
  },
  {
    id: '4',
    title: 'Sheet Pan Lemon Herb Salmon with Asparagus',
    description: 'An easy and healthy one-pan meal, perfect for a quick and flavorful dinner.',
    image: 'https://via.placeholder.com/400x300/FCD34D/FFFFFF?text=Salmon+Asparagus',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: '2',
    cuisine: 'American',
    dietary: ['Gluten-Free', 'Dairy-Free', 'Keto'],
    ingredients: [
      '2 salmon fillets (about 150g each)',
      '1 bunch asparagus, tough ends trimmed',
      '1 lemon, sliced',
      '2 tbsp olive oil',
      '1 tsp dried dill',
      '1/2 tsp garlic powder',
      'Salt and black pepper to taste'
    ],
    instructions: [
      'Preheat oven to 200°C (400°F). Line a baking sheet with parchment paper.',
      'On the baking sheet, toss asparagus with 1 tbsp olive oil, salt, and pepper.',
      'Place salmon fillets on the same baking sheet. Drizzle with remaining 1 tbsp olive oil.',
      'Season salmon with dill, garlic powder, salt, and pepper.',
      'Top each salmon fillet with lemon slices.',
      'Bake for 15-20 minutes, or until salmon is cooked through and flakes easily with a fork, and asparagus is tender-crisp.',
      'Serve immediately.'
    ],
    rating: 4.6
  },
  {
    id: '5',
    title: 'Vegetable Curry',
    description: 'A fragrant and creamy vegetarian curry with a medley of vegetables, served with rice.',
    image: 'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Veg+Curry',
    prepTime: '20 min',
    cookTime: '30 min',
    servings: '4',
    cuisine: 'Indian',
    dietary: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    ingredients: [
      '1 tbsp coconut oil',
      '1 onion, chopped',
      '2 cloves garlic, minced',
      '1 tbsp ginger, grated',
      '1 tsp curry powder',
      '1/2 tsp turmeric',
      '1/4 tsp cayenne pepper (optional)',
      '1 can (400ml) coconut milk',
      '1 can (400g) diced tomatoes',
      '1 cup vegetable broth',
      '2 potatoes, peeled and diced',
      '1 cup green beans, trimmed and cut',
      '1 cup cauliflower florets',
      '1/2 cup frozen peas',
      'Fresh cilantro for garnish',
      'Cooked rice for serving'
    ],
    instructions: [
      'Heat coconut oil in a large pot or Dutch oven over medium heat.',
      'Add onion and cook until softened, about 5 minutes.',
      'Stir in garlic and ginger and cook for 1 minute until fragrant.',
      'Add curry powder, turmeric, and cayenne pepper (if using). Cook for 1 minute, stirring constantly.',
      'Pour in coconut milk, diced tomatoes, and vegetable broth. Bring to a simmer.',
      'Add diced potatoes, green beans, and cauliflower florets. Cover and simmer for 15-20 minutes, or until vegetables are tender.',
      'Stir in frozen peas and cook for another 2-3 minutes.',
      'Taste and adjust seasoning if needed.',
      'Serve hot over cooked rice, garnished with fresh cilantro.'
    ],
    rating: 4.4
  }
];

export default mockRecipes;
