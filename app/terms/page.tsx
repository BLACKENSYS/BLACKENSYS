import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter mb-4">Terms of Service</h1>
              <p className="text-muted-foreground mb-8">Last updated: April 10, 2025</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">1. Introduction</h2>
              <p>
                Welcome to BLACKENSYS. These Terms of Service govern your use of our website, products, and services. By
                accessing or using BLACKENSYS, you agree to be bound by these Terms.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">2. Definitions</h2>
              <p>
                "Service" refers to the BLACKENSYS platform, including all content, features, and functionality offered.
              </p>
              <p>"User," "You," and "Your" refer to the individual or entity using our Service.</p>
              <p>"Content" refers to all text, images, videos, and other material that appears on our Service.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">3. Account Registration</h2>
              <p>
                To use certain features of the Service, you must register for an account. You agree to provide accurate,
                current, and complete information during the registration process.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all
                activities that occur under your account.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">4. User Content</h2>
              <p>
                You retain ownership of any content you upload to the Service. By uploading content, you grant
                BLACKENSYS a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display your
                content for the purpose of operating and improving the Service.
              </p>
              <p>
                You are solely responsible for the content you upload and must ensure it complies with our content
                guidelines and applicable laws.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">5. Prohibited Activities</h2>
              <p>You agree not to engage in any of the following prohibited activities:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Violating any laws or regulations</li>
                <li>Infringing on the intellectual property rights of others</li>
                <li>Uploading or sharing harmful, offensive, or illegal content</li>
                <li>Attempting to gain unauthorized access to the Service or other users' accounts</li>
                <li>Using the Service for any commercial purpose without our consent</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">6. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account at our sole discretion, without notice, for
                conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for
                any other reason.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">7. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. We will provide notice of significant changes by posting the
                updated Terms on our website. Your continued use of the Service after such modifications constitutes
                your acceptance of the updated Terms.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, BLACKENSYS shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
                directly or punitive damages, or any loss of profits or revenues, whether incurred directly or
                indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from: (i) your
                access to or use of or inability to access or use the Service; (ii) any conduct or content of any third
                party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use, or
                alteration of your transmissions or content.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">9. Disclaimer of Warranties</h2>
              <p>
                The Service is provided "as is" and "as available" without warranties of any kind, either express or
                implied, including, but not limited to, implied warranties of merchantability, fitness for a particular
                purpose, non-infringement, or course of performance.
              </p>
              <p>
                BLACKENSYS does not warrant that: (a) the Service will function uninterrupted, secure, or available at
                any particular time or location; (b) any errors or defects will be corrected; (c) the Service is free of
                viruses or other harmful components; or (d) the results of using the Service will meet your
                requirements.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">10. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at legal@blackensys.com.</p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
