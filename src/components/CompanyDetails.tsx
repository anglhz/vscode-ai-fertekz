import { companyDetails } from "@/content/companyDetails";

const CompanyDetails = () => (
  <section>
    <h2>Företagsuppgifter</h2>
    <dl className="grid gap-3 rounded-xl border border-primary/20 bg-background/50 p-5 sm:grid-cols-[12rem_1fr]">
      <dt className="font-semibold text-foreground">Juridiskt namn</dt>
      <dd>{companyDetails.legalName}</dd>

      <dt className="font-semibold text-foreground">Företagsnamn</dt>
      <dd>{companyDetails.tradingName}</dd>

      <dt className="font-semibold text-foreground">Företagsform</dt>
      <dd>{companyDetails.companyType}</dd>

      <dt className="font-semibold text-foreground">Organisationsnummer</dt>
      <dd>{companyDetails.organizationNumber}</dd>

      <dt className="font-semibold text-foreground">Postadress</dt>
      <dd>{companyDetails.postalAddress}</dd>

      <dt className="font-semibold text-foreground">E-post</dt>
      <dd>
        <a href={`mailto:${companyDetails.email}`}>{companyDetails.email}</a>
      </dd>

      <dt className="font-semibold text-foreground">Skatt</dt>
      <dd>{companyDetails.taxStatus}</dd>
    </dl>
  </section>
);

export default CompanyDetails;
