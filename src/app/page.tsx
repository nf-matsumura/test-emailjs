import ContactForm from "~/app/components/ContactForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 w-1/2 m-auto">
      <ContactForm />
    </main>
  );
}
