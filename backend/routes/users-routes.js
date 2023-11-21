const express = require("express");

const router = express.Router();

const USERS = [
  {
    id: "u1",
    name: "Ricky Blowtorch",
    image:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2Fe410f6b3-617c-4210-b03a-793d69623fad%2Fddoaaml-b6fc78f4-6e91-4871-9dbc-3e9d598e2862.png%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U0MTBmNmIzLTYxN2MtNDIxMC1iMDNhLTc5M2Q2OTYyM2ZhZFwvZGRvYWFtbC1iNmZjNzhmNC02ZTkxLTQ4NzEtOWRiYy0zZTlkNTk4ZTI4NjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Brk0FtuamlhfyalfunOPwsDo9SJ4I9q_9CVW-0_bFn0&tbnid=P1ummVfhGZzWvM&vet=12ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa..i&imgrefurl=https%3A%2F%2Fwww.deviantart.com%2Fcoolcsd1986%2Fart%2FTeenage-Mutant-Ninja-Turtles-1987-Version-826851405&docid=MNyTHM8PRrordM&w=1000&h=1300&q=teenage%20mutant%20ninja%20turtles%20deviantart&ved=2ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa",
    places: 69,
  },
  {
    id: "u2",
    name: "Hannah Steele",
    image:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2Fe410f6b3-617c-4210-b03a-793d69623fad%2Fddoaaml-b6fc78f4-6e91-4871-9dbc-3e9d598e2862.png%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U0MTBmNmIzLTYxN2MtNDIxMC1iMDNhLTc5M2Q2OTYyM2ZhZFwvZGRvYWFtbC1iNmZjNzhmNC02ZTkxLTQ4NzEtOWRiYy0zZTlkNTk4ZTI4NjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Brk0FtuamlhfyalfunOPwsDo9SJ4I9q_9CVW-0_bFn0&tbnid=P1ummVfhGZzWvM&vet=12ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa..i&imgrefurl=https%3A%2F%2Fwww.deviantart.com%2Fcoolcsd1986%2Fart%2FTeenage-Mutant-Ninja-Turtles-1987-Version-826851405&docid=MNyTHM8PRrordM&w=1000&h=1300&q=teenage%20mutant%20ninja%20turtles%20deviantart&ved=2ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa",
    places: 420,
  },
  {
    id: "u3",
    name: "Gia Olson",
    image:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2Fe410f6b3-617c-4210-b03a-793d69623fad%2Fddoaaml-b6fc78f4-6e91-4871-9dbc-3e9d598e2862.png%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U0MTBmNmIzLTYxN2MtNDIxMC1iMDNhLTc5M2Q2OTYyM2ZhZFwvZGRvYWFtbC1iNmZjNzhmNC02ZTkxLTQ4NzEtOWRiYy0zZTlkNTk4ZTI4NjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Brk0FtuamlhfyalfunOPwsDo9SJ4I9q_9CVW-0_bFn0&tbnid=P1ummVfhGZzWvM&vet=12ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa..i&imgrefurl=https%3A%2F%2Fwww.deviantart.com%2Fcoolcsd1986%2Fart%2FTeenage-Mutant-Ninja-Turtles-1987-Version-826851405&docid=MNyTHM8PRrordM&w=1000&h=1300&q=teenage%20mutant%20ninja%20turtles%20deviantart&ved=2ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa",
    places: 80085,
  },
  {
    id: "u4",
    name: "Candee Maxx",
    image:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2Fe410f6b3-617c-4210-b03a-793d69623fad%2Fddoaaml-b6fc78f4-6e91-4871-9dbc-3e9d598e2862.png%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U0MTBmNmIzLTYxN2MtNDIxMC1iMDNhLTc5M2Q2OTYyM2ZhZFwvZGRvYWFtbC1iNmZjNzhmNC02ZTkxLTQ4NzEtOWRiYy0zZTlkNTk4ZTI4NjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Brk0FtuamlhfyalfunOPwsDo9SJ4I9q_9CVW-0_bFn0&tbnid=P1ummVfhGZzWvM&vet=12ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa..i&imgrefurl=https%3A%2F%2Fwww.deviantart.com%2Fcoolcsd1986%2Fart%2FTeenage-Mutant-Ninja-Turtles-1987-Version-826851405&docid=MNyTHM8PRrordM&w=1000&h=1300&q=teenage%20mutant%20ninja%20turtles%20deviantart&ved=2ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa",
    places: 13,
  },
];

router.get("/:userId", (req, res, next) => {
  const userId = req.params.userId; // get the user ID from the URL.
  const user = USERS.find((u) => {
    return u.id === userId; // find the user with the id of userId.
  });
  res.json({ user: user }); // return the user.
});




module.exports = router;