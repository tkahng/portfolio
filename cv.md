# Tchunoo Rhee Kahng

**Senior Full-Stack Software Engineer** · Fullerton, CA  
[tkahng@gmail.com](mailto:tkahng@gmail.com) · [github.com/tkahng](https://github.com/tkahng) · [linkedin.com/in/tchunoo-kahng](https://www.linkedin.com/in/tchunoo-kahng-612aa6152/)

---

## Summary

Senior full-stack engineer with 12+ years building production systems across startups and design-technology firms. As CTO of a startup, led end-to-end backend architecture, cloud migration, API design, and cross-functional coordination with frontend and mobile teams. Experienced shipping e-commerce platforms, serverless workloads, and domjain-specific analysis engines in TypeScript, Go, C#, and Java on AWS infrastructure.

---

## Professional Experience

### Career Break & Relocation · Fullerton, CA · Apr 2024 – Present

Relocated from South Korea to the US for family reasons. Used the transition period to deepen skills in Go, Kubernetes, and infrastructure engineering.

- Built and operated a multi-node Kubernetes cluster on Proxmox from scratch, configuring containerd, CNI networking, and node provisioning.
- Developing a custom headless CMS backend in Go with TipTap-based rich text editing, structured JSON storage, and middleware-resolved collection references.
- 3,000+ GitHub commits in the past year across backend systems, geospatial tooling, and infrastructure automation.

### Qwerky Inc · CTO / Full-Stack Engineer · Seoul, South Korea · Oct 2020 – Apr 2024

Led engineering across four products at a construction-tech startup, owning backend architecture, data modeling, infrastructure, and technical strategy. Coordinated daily with frontend (Next.js) and mobile (React Native) engineers.

**Builderful** — Construction materials e-commerce platform (search, quotes, orders, payments)

- Reverse-engineered a legacy PHP REST API and rewrote it as a TypeScript/Node.js GraphQL backend (Apollo Server, Prisma ORM), carefully preserving API contracts while coordinating schema design with frontend and mobile teams.
- Cleaned and normalized a denormalized database using custom Python scripts to resolve invalid data and structural issues before migration.
- Migrated a monolithic PHP app from a single-point-of-failure VPS to a containerized AWS deployment with managed RDS — gaining compute/data separation, automated backups, point-in-time recovery, and infrastructure-as-code reproducibility.
- Built the quote-to-order pipeline: vendor quoting, order management, payment processing, and fulfillment workflows with admin tooling.
- Designed the search UI and built search APIs serving both web (Next.js) and mobile (React Native) clients.
- Developed serverless post-order and post-quote workloads on AWS Lambda (TypeScript).
- Co-authored the technical proposal that secured a South Korean government innovation grant for v2 of the platform.

**Deepform** — Browser-based 3D model analysis for architects

- Sole developer of DeepformCore, a .NET Core analysis engine that reads Rhino 3dm files via an AWS Lambda function on Linux — a significant departure from the Windows-only norm in AEC software.
- Classified arbitrary 3D geometry into architectural components (floors, programs, levels) and produced floor area breakdowns by program and floor for feasibility dashboards.
- Adopted Hypar Elements, an open-source cross-platform BIM library, for JSON-serializable geometry processing to support future file format expansion beyond Rhino.
- Built the main application backend in NestJS/TypeScript with TypeORM, Redis, and BullMQ for background job processing.

**Markurz** — Productivity browser extension (web clipper → task creation)

- Built backend integrations for Notion, Jira, Trello, and Microsoft To Do, enabling one-click task creation from highlighted web content.
- Backend: NestJS, GraphQL, TypeORM, BullMQ, deployed on Azure.

**Construckit** — Construction project management SaaS

- Developed the NestJS/TypeScript backend (REST, TypeORM, BullMQ) for a collaboration platform focused on approval workflows and document sharing for construction teams. Deployed on Azure.

### Insigong · Computational Design Engineer · Seoul, South Korea · Jan 2012 – Oct 2020

- Built Python/C# automation tools for Rhino and Revit that replaced manual geometric modeling workflows, reducing design iteration cycles by over 50%.
- Developed end-to-end GIS + ML pipelines analyzing urban areas up to 200 km², combining South Korean government open data (land use, zoning, tax) with automated 3D visualizations and HTML reports for feasibility studies.
- Created a suite of Python tools for rapid mixed-use feasibility modeling in Rhino — auto-assigning program data to geometry to produce lightweight parametric BIM models for stakeholder review.
- Led the firm-wide transition from CAD to BIM, building custom integrations that automated document generation from upstream model data.
- Technical lead on projects that won 1st Place in three architecture competitions (2013, 2015, 2016), including a collaboration with Gehry Partners on a 2,000+ unit residential complex in Masan.

---

## Education

**Carnegie Mellon University** · School of Architecture · Pittsburgh, PA · 2008 – 2011

---

## Technical Skills

**Languages:** Go, TypeScript, Java, C# (.NET), Python  
**Backend:** Node.js, NestJS, Apollo GraphQL, Prisma, TypeORM, Spring Boot, ASP.NET  
**Frontend:** React, Next.js, Angular  
**Infrastructure:** Docker, Kubernetes, Terraform, AWS (CDK, Lambda, RDS, EC2), GitHub Actions, Proxmox  
**Data:** PostgreSQL, PostGIS, Redis, Kafka, BullMQ, Pandas, H3  
**Specialized:** AEC/BIM Development (Revit API, Rhino SDK, Hypar Elements), Geospatial (QGIS, Deck.gl)
