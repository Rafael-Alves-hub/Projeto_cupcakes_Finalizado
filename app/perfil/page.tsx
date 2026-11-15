
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { sql } from "@/app/util/db";
import { verifySession } from "@/app/lib/Session";
import "@/app/globals.css";

export default async function Perfil() {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileContent />
    </Suspense>
  );
}

async function ProfileContent() {

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

function ProfileLoading() {
  return (
    <section className="catalog-section" id="catalogo">
      <h1>Minha conta</h1>
      <p>Carregando seu perfil...</p>
    </section>
  );
}
