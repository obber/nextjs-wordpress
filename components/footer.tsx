import Container from "./container";
import { Subscribe } from "./subscribe";

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <Subscribe />
      </Container>
    </footer>
  );
}
