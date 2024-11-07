import { awscdk, javascript} from 'projen';
import { NpmAccess } from 'projen/lib/javascript';
import {
  PULL_REQUEST_TEMPLATE,
  GITHUB_OPTIONS,
  GIT_IGNORE_PATTERNS,
  NPM_IGNORE_PATTERNS,
  ESLINT_RULE,
} from './projenrc/constants';
import { runTestsWorkflow } from './projenrc/run-tests-workflow';

const GITHUB_USER: string = 'arylwen';
const PUBLICATION_NAMESPACE: string = 'arylwen';
const PROJECT_NAME: string = 'lstk-sbt-aws';
const PROJEN_VERSION: string = '0.86.9';
const CDK_VERSION: string = '2.140.0';
const JSII_VERSION: string = '~5.3.0';
//const CONSTRUCTS_VERSION: string = '10.0.5';
//const AWS_SDK_VERSION: string = '^3.621.0';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'arylwen',
  authorAddress: 'gabriela@halcyon-solutions.com',
  cdkVersion: '2.140.0',
  defaultReleaseBranch: 'main',
  deps: [
    `@aws-cdk/aws-lambda-python-alpha@${CDK_VERSION}-alpha.0`,
    'cdk-nag@^2.27.230',
    `@aws-cdk/aws-kinesisfirehose-alpha@${CDK_VERSION}-alpha.0`,
    `@aws-cdk/aws-kinesisfirehose-destinations-alpha@${CDK_VERSION}-alpha.0`,
    `@cdklabs/sbt-aws`,
  ],
  description:
    'SaaS Builder Toolkit for AWS is a developer toolkit to implement SaaS best practices and increase developer velocity.',
  devDeps: [
    `aws-cdk@${CDK_VERSION}`,
    'eslint-plugin-header',
    `@aws-cdk/aws-kinesisfirehose-alpha@${CDK_VERSION}-alpha.0`,
    `braces@>=3.0.3`, // fixes CVE-2024-4068
  ],
  github: true,
  jsiiVersion: JSII_VERSION,
  keywords: ['constructs', 'aws-cdk', 'saas'],
  license: 'Apache-2.0',
  licensed: true,
  maxNodeVersion: '20.x',
  minNodeVersion: '18.12.0',
  name: `@${PUBLICATION_NAMESPACE}/${PROJECT_NAME}`,
  npmignoreEnabled: true,
  packageManager: javascript.NodePackageManager.NPM,
  peerDeps: [`@aws-cdk/aws-kinesisfirehose-alpha@${CDK_VERSION}-alpha.0`],
  prettier: true,
  projenrcTs: true,
  projenVersion: PROJEN_VERSION,
  pullRequestTemplateContents: PULL_REQUEST_TEMPLATE,
  repositoryUrl: `https://github.com/${GITHUB_USER}/${PROJECT_NAME}`,
  sampleCode: false,
  stability: 'experimental',
  workflowNodeVersion: '20.x',
  npmTokenSecret: 'NPM_TOKEN',
  npmAccess: NpmAccess.PUBLIC,
  githubOptions: GITHUB_OPTIONS,
  gitignore: GIT_IGNORE_PATTERNS,
  npmIgnoreOptions: {
    ignorePatterns: NPM_IGNORE_PATTERNS,
  },
  releaseTagPrefix: '@cdklabs/sbt-aws-',
});

// Add License header automatically
project.eslint?.addPlugins('header');
project.eslint?.addRules({
  'header/header': ESLINT_RULE,
});

runTestsWorkflow(project);
project.synth();