import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GalleryRecord, listGalleryImages } from "@/db/gallery-repository";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  let images: GalleryRecord[] = [];
  let unavailable = false;
  try { images = await listGalleryImages(); } catch (error) { console.error(error); unavailable = true; }

  return <main><Header />
    <section className="inner-hero gallery-hero">
      <img src="10.jpeg" alt="rosewood Hotel interior" />
      <div className="hero-veil" />
      <div>
        <span className="kicker">THE rosewood EXPERIENCE</span>
        <h1>Take a look<br /><em>inside.</em></h1>
      </div>
    </section>

    <section className="gallery-page">
      <div className="gallery-heading">
        <div>
          <span className="kicker dark">OUR GALLERY</span>
          <h2>Spaces made<br />to <em>feel good.</em></h2>
        </div>
        <p>Discover the rooms, details and shared spaces that make every rosewood stay memorable.</p>
      </div>

      {unavailable ? (
        <div className="empty-gallery">
          <h3>Gallery temporarily unavailable</h3>
          <p>Please check back shortly.</p>
        </div>
      ) : images.length === 0 ? (
        <div className="empty-gallery">
          <h3>New photographs coming soon</h3>
          <p>Our team is currently updating the rosewood gallery.</p>
        </div>
      ) : (
        <div className="public-gallery-grid">
          {images.map((image, index) => (
            <figure key={image.id}>
              <img src={image.imageUrl} alt={image.altText} />
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {image.title}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
    <Footer />
  </main>;
}