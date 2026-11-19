const english = {
  skip: 'Skip to projects', projects: 'Projects', about: 'About', contact: 'Contact',
  role: 'DATA ENGINEER · GOIÂNIA, BRAZIL',
  headline: 'From integration to trusted data.',
  intro: 'I build pipelines and Data Warehouses that connect systems, organize business rules, and deliver data for analysis.',
  explore: 'Explore the projects', approach: 'End-to-end data engineering',
  flow1: 'Ingestion', flow2: 'Transformation', flow3: 'Consumption',
  foundation: 'Quality, observability, and governance at every stage.',
  selected: 'Inside the projects', caseNote: 'Anonymized case studies based on my professional experience.',
  airCategory: 'DATA PLATFORM · ORCHESTRATION AND ANALYTICS',
  airTitle: 'Integrations, events, and a shared analytics layer.',
  airLead: 'An architecture that brings ERP, CRM, APIs, application databases, and spreadsheets into a Data Warehouse, with data transformation and quality checks.',
  enlarge: 'Explore architecture',
  airCaption: 'From API and webhook ingestion to the Gold layer, with CI/CD and observability.',
  challenge: 'The challenge', contribution: 'My contribution', delivery: 'The delivery',
  airChallenge: 'Consolidate data from different systems to support shared metrics, with traceable load processes and consistent business rules.',
  airContribution: 'Developed DAGs and Python integrations, structured the MySQL DW, and built SQL transformations. Extended the platform with dbt and webhooks, code review, tests, and delivery automation.',
  airDelivery: 'Staging, control, fact, and dimension layers deliver data to Power BI and analytical consumers. Execution monitoring and failure alerts support pipeline operations.',
  decisions: 'Technical decisions and operations',
  airD1Title: 'Reusable API clients', airD1: 'Authentication, pagination, timeouts, and retries are centralized per source. DAGs reuse this logic when extracting each entity.',
  airD2Title: 'Traceable incremental loads', airD2: 'Configuration, watermarks, and execution logs track load progress. Transformations apply deduplication, business rules, and dimensional history.',
  airD3Title: 'Quality and continuous delivery', airD3: 'Tests cover uniqueness, required fields, and referential integrity. GitHub Actions validates code and DAGs and supports deployment and rollback.',
  airD4Title: 'Access and observability', airD4: 'Credentials use Airflow Connections and GitHub Secrets, with read-only access for consumers and failure alerts through GitHub Issues.',
  azureCategory: 'MICROSOFT AZURE · DATA WAREHOUSE AND BI',
  azureTitle: 'Metadata-driven ingestion, from ADF to Power BI.',
  azureLead: 'Parameterized pipelines integrate APIs and organize loads by date, route, and page. A load control table centralizes ingestion configuration.',
  azureCaption: 'Linked services, datasets, pipelines, SQL curation, and analytical delivery.',
  azureChallenge: 'Ingest multiple API routes while coordinating pagination and date windows, then deliver curated data for analysis with infrastructure cost controls.',
  azureContribution: 'Developed ADF pipelines and stored procedure transformations, control-table parameterization, and failure handling. Used Azure DevOps for version control, with Key Vault and Logic Apps integrations.',
  azureDelivery: 'Incremental API loads into staging, followed by processing into analytical tables. Dataflows and the semantic layer deliver data for Power BI reporting.',
  azureD1Title: 'Centralized load control', azureD1: 'Endpoints, filters, page limits, and LAST_LOAD are stored in the control table. Chained pipelines iterate through dates, transport routes, and API pages.',
  azureD2Title: 'Seven-day reprocessing window', azureD2: 'Loads start from LAST_LOAD minus seven days to recover recent changes. Stored procedures process records and apply business rules before analytical loading.',
  azureD3Title: 'Serverless SQL and alerts', azureD3: 'Azure SQL scales from 0.5 to 2 vCores and pauses after one hour of inactivity. The pipeline resumes the database before loading. Logged failures trigger emails through Logic Apps.',
  azureD4Title: 'Reference model and expansion', azureD4: 'The diagram shows on-premises SAP with a self-hosted runtime, spreadsheets, and AI agents as expansion options. FACT/DIMENSION schemas and departmental data marts illustrate the analytical organization.',
  aboutTitle: 'Engineering connected to business.',
  bio: 'I am Fábio Lima, a data engineer with experience in systems integration, ETL/ELT pipelines, dimensional modeling, and Business Intelligence. My background includes consulting for multiple clients and projects in industry and logistics.',
  bio2: 'I work with SQL, Python, Apache Airflow, Azure Data Factory, SSIS, and Power BI, connecting ingestion to the needs of the people who use the data.',
  context: 'The architectures have been adapted for public presentation, with company names and environments anonymized. Expansion examples are identified within the case studies.',
  conversation: 'LET’S TALK', contactTitle: 'Does your next project need trusted data?',
  back: 'Back to top', architecture: 'Project architecture', original: 'Open original',
  close: 'Close', zoomHelp: 'Scroll to explore the architecture at its original size.'
};

const textNodes = [...document.querySelectorAll('[data-i18n]')];
const portuguese = Object.fromEntries(textNodes.map(node => [node.dataset.i18n, node.textContent]));
const images = {
  pt: { airflow: 'AIRFLOW_PORTUGUES.gif', azure: 'AZURE_PORTUGUES.gif' },
  en: { airflow: 'AIRFLOW_English.gif', azure: 'AZURE_English.gif' }
};
const descriptions = {
  pt: {
    airflow: 'Arquitetura de integração com Airflow, dbt, MySQL, FastAPI e Microsoft Fabric',
    azure: 'Arquitetura Azure com Data Factory, SQL, curadoria, Data Warehouse e Power BI'
  },
  en: {
    airflow: 'Integration architecture with Airflow, dbt, MySQL, FastAPI, and Microsoft Fabric',
    azure: 'Azure architecture with Data Factory, SQL, curation, Data Warehouse, and Power BI'
  }
};
const viewer = document.querySelector('#viewer');
const viewerImage = document.querySelector('#viewer-image');
let language = 'pt';
let activeDiagram = 'airflow';

function setLanguage(next) {
  language = next === 'en' ? 'en' : 'pt';
  const copy = language === 'en' ? english : portuguese;
  document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
  document.title = language === 'en' ? 'Fábio Lima · Data Engineering' : 'Fábio Lima · Engenharia de Dados';
  document.querySelector('meta[name="description"]').content = language === 'en'
    ? 'Fábio Lima — Data Engineering. Integration, Data Warehouse, Airflow, dbt, and Azure Data Factory projects.'
    : 'Fábio Lima — Engenharia de Dados. Projetos de integração, Data Warehouse, Airflow, dbt e Azure Data Factory.';
  textNodes.forEach(node => { node.textContent = copy[node.dataset.i18n]; });
  document.querySelectorAll('[data-lang]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === language));
  });
  for (const name of ['airflow', 'azure']) {
    const image = document.querySelector(`#${name}-image`);
    image.src = images[language][name];
    image.alt = descriptions[language][name];
    document.querySelector(`[data-diagram="${name}"]`).setAttribute('aria-label', `${copy.enlarge} — ${name === 'airflow' ? 'Airflow' : 'Azure'}`);
  }
  const url = new URL(location.href);
  url.searchParams.set('lang', language);
  history.replaceState(null, '', url);
}

document.querySelectorAll('[data-lang]').forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});
document.querySelectorAll('[data-diagram]').forEach(button => {
  button.addEventListener('click', () => {
    activeDiagram = button.dataset.diagram;
    viewerImage.src = images[language][activeDiagram];
    viewerImage.alt = descriptions[language][activeDiagram];
    document.querySelector('#original').href = images[language][activeDiagram];
    viewer.showModal();
    document.body.classList.add('modal-open');
  });
});
document.querySelector('#close-viewer').addEventListener('click', () => viewer.close());
viewer.addEventListener('close', () => document.body.classList.remove('modal-open'));
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
setLanguage(new URLSearchParams(location.search).get('lang'));
