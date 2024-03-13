"use client";

import { useState } from "react";

// Ligne ci dessous permet d'avoir de la cohérence entre les pages
export type Item = {
  title: string;
  content: string;
};

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function submit() {
    const data: Item = {
      title: title,
      content: description,
    };
    const reponse = await fetch("/api/newproduct", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const product = await reponse.json();
    console.log(product);
  }
  return (
    <div>
      <h1>Sell your products !</h1>

      <form>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
}

//
// {/* <p>Note : ajouter une page d'authentification {title}</p> */}

//
// Pour améliorer :
// Fetch ne fonctionne que pour les clients ayant javascript

// Utiliser une requete qui ne demande pas que l'utilisateur ait obligatoirement javascript
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

// async function createInvoice(formData: FormData) {
//     "use server";

//     const rawFormData = {
//       customerId: formData.get("customerId"),
//       amount: formData.get("amount"),
//       status: formData.get("status"),
//     };

//     // mutate data
//     // revalidate cache
//   }
// <form action={createInvoice}>...</form>;
