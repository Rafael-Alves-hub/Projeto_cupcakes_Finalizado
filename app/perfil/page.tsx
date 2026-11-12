
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "@/app/util/db";
import { verifySession } from "@/app/lib/Session";
import { DM_Sans } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { AppProvider } from "@/app/lib/AppContext";
import Modal from "@/app/lib/Modal"
import Cart from "@/app/components/Cart"


export default async function Perfil() {

  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect("/");
  }

  const session = verifySession(token);
  if (!session) {
    redirect("/");
  }

  const [user] = await sql`
        SELECT id, name, email
        FROM public."user"
        WHERE id = ${session.id}
        LIMIT 1
    `;

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <section className="catalog-section" id="catalogo">
      <h1>Minha conta</h1><h2>Bem-vindo(a), {user.name}!</h2>
        <p>Você está autenticado!</p>
        <div className="profile-information">
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>E-mail:</strong> {user.email}</p>
        </div>
      </section>
    </>
  );
}