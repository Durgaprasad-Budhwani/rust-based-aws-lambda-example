
## Rust-Based AWS Lambda With AWS CDK Deployment

**Amazon Web Services (AWS) Lambda** is a computing service that lets you run code without provisioning or managing servers. AWS Lambda executes your code only when triggered and automatically scales to support the number of requests made.

With AWS Lambda, you can run code for virtually any application or backend service with zero administration. You can use AWS Lambda to run your code in response to events, such as changes to data in an Amazon S3 bucket or an Amazon DynamoDB table; to run your code in response to HTTP requests using Amazon API Gateway, or to execute your code on a schedule using Amazon CloudWatch Events.

AWS Lambda can run code written in Node.js, Python, C#, Go and several other languages. You can use the AWS Serverless Application Model (AWS SAM) to define and deploy your serverless applications, including your AWS Lambda functions, APIs, and Amazon DynamoDB tables.

AWS Lambda is a cost-effective and flexible way to build and run applications and services, especially when combined with other AWS services. For example, you can use AWS Lambda to process data from Amazon Kinesis streams, send messages to Amazon Simple Queue Service (SQS), or send data to Amazon Simple Notification Service (SNS).

Using the **Rust programming language** to create AWS Lambda functions is possible. AWS Lambda natively supports several languages, including Node.js, Python, and C#, but it is possible to use other languages by creating a custom runtime

Using Rust to create AWS Lambda functions can be a good choice if you want to take advantage of Rust’s performance and safety features. However, it is essential to note that using a custom runtime may require more setup and maintenance than using one natively supported language.

## Prerequisite

To get started, you must have the following prerequisites:

* [AWS Account](https://portal.aws.amazon.com/) with AWS Lambda creation access

* [Node Installation](https://nodejs.org/en/download/)

* [AWS CLI ](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)Configure

* [Rust](https://www.rust-lang.org/learn/get-started)

* [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)

* [rustup](https://sh.rustup.rs) (

* [VSCode](https://code.visualstudio.com/) or[ Any Jetbrains Development IDE ](https://www.jetbrains.com/webstorm/)(For this post, I will be using WebStorm IDE)

* [Rust Jetbrains Plugin](https://www.jetbrains.com/rust/) if you are using JetBrains IDE

## Getting Started:

The easiest way to start writing Lambda functions with Rust is by using [Cargo Lambda](https://www.cargo-lambda.info/). This Cargo subcommand provides several commands to help you in your journey with Rust on AWS Lambda.

The preferred way to install Cargo Lambda is by using a package manager.

1- Use Homebrew on [MacOS](https://brew.sh/):

    brew tap cargo-lambda/cargo-lambda
    brew install cargo-lambda

2- Use [Scoop](https://scoop.sh/) on Windows:

    scoop bucket add cargo-lambda https://github.com/cargo-lambda/scoop-cargo-lambda
    scoop install cargo-lambda/cargo-lambda

Or PiP on any system with Python 3 installed:

    pip3 install cargo-lambda

See other installation options in [the Cargo Lambda documentation](https://www.cargo-lambda.info/guide/installation.html).

### Create Lambda Function:

To create an AWS Lambda Function, run the following command:

    cargo lambda new rust-based-aws-lambda-example

This will ask you a couple of questions, like is it an HTTP function, and if yes, what will be the source of receiving end?

![](https://cdn-images-1.medium.com/max/2636/1*KAqSEflrjwnUlTJpFW2gmg.png)
>  Is this function an HTTP function? Yes
Which service is this function receiving events from? Amazon Api Gateway HTTP Api

And this is going to create two files:
***Cargo.toml ***

<iframe src="https://medium.com/media/a161c2f81bd57ed3c07cfe6903e6025d" frameborder=0></iframe>

***src/main.rs***

<iframe src="https://medium.com/media/3495d08c05eb80a721741d0501cd56fc" frameborder=0></iframe>



There are a few experimental features. To enable practical features, you need to run the command. rustup toolchain install nightly

    rustup target add aarch64-unknown-linux-gnu

## Local Testing:

To test your function locally, you can use the cargo lambda start Command. This command allows you to start your function's HTTP server locally by listening to the port number :9000

![](https://cdn-images-1.medium.com/max/2004/1*i3ootMmTkwJavdaEXqnMpg.png)

You can test the lambda function by opening [http://localhost:9000/lambda-url/rust-based-aws-lambda-example/](http://localhost:9000/lambda-url/rust-based-aws-lambda-example/) in a web browser.
[rust-based-aws-lambda-example](http://localhost:9000/lambda-url/rust-based-aws-lambda-example/) Is the name of the project and [http://localhost:9000/lambda-url](http://localhost:9000/lambda-url/rust-based-aws-lambda-example/) the prefix URL

![](https://cdn-images-1.medium.com/max/2000/1*PrINDoTf0KTdKgHY95Ydpg.png)

## Build Artifact:

To use Rust to create an AWS Lambda function, you must create a custom runtime and build your role as a standalone executable. The executable will be packaged and deployed to AWS Lambda as a ZIP file, along with the runtime and any dependencies required by your function.

To create a custom runtime, you must create a **bootstrap** executable responsible for starting and stopping your function. The bootstrap executable will receive requests from AWS Lambda, invoke your function, and return the response to AWS Lambda.

The cargo lambda build The command can build a Rust function for deployment to AWS Lambda. To develop your function, navigate to the root of your project directory and run the following command:

    cargo lambda build --release

This will compile your Rust code and create a deployment (bootstrap) package in the target/lambda/rust-based-aws-lambda-example directory.

![](https://cdn-images-1.medium.com/max/2214/1*_yxgCIiHrSgxQA4BuKS8nw.png)

## **AWS Cloud Development Kit (CDK) **Deployment:

Amazon Web Services (AWS) Cloud Development Kit (CDK) is an open-source software development framework to define cloud infrastructure in code and provision it through AWS CloudFormation. It allows you to design, compose, and share custom resources that integrate with AWS services.

The CDK defines cloud resources using familiar programming languages, such as TypeScript, JavaScript, Python, C#, and Java. It then converts your code into CloudFormation templates, which are used to provision and manage your resources on AWS.

Some benefits of using the CDK include the following:

* Familiar language: You can use programming languages you are already aware of to define your infrastructure.

* Reusable components: You can define your custom resources and use them across multiple stacks and environments, making it easier to maintain and manage your infrastructure.

* Collaboration: You can version your infrastructure and share it with others through source control.

* Integration: You can use the CDK to integrate with other AWS services and tools, such as AWS CloudWatch, AWS CodePipeline, and AWS SAM (AWS Serverless Application Model).

The CDK is a powerful tool that can help you automate the provisioning and management of your cloud infrastructure.

You need to perform the following steps:

* Install AWS CDK:

  npm install -g aws-cdk

* Create an empty directory deploy and navigate to that directory

  mkdir deploy && cd deploy

* Initialized AWS CDK with typescript or javascript

  cdk init app --language=typescript

After successful installation, you will see lots of files in deploy the folder:

![](https://cdn-images-1.medium.com/max/2000/1*lbD4MBkM5OLq5tr5Ra2jDQ.png)

* Open deploy/lib/deploy-stack.ts File and import AWS Lambda **Function**:

  import {Code, Function, Runtime, FunctionUrlAuthType} from "aws-cdk-lib/aws-lambda";
  import {CfnOutput} from "aws-cdk-lib";

* Add the lambda handler with the properties

  const handler = new Function(this, "MyFunction", {
  // The source code of your Lambda function. You can point to a
  // file in an Amazon Simple Storage Service (Amazon S3) bucket
  // or specify your source code as inline text.
  code: Code.fromAsset(path.join(__dirname, "..", "..", "target/lambda/rust-based-aws-lambda-example")),
  // The runtime environment for the Lambda function that you are uploading.
  // For valid values, see the Runtime property in the AWS Lambda Developer Guide.
  // Use Runtime.FROM_IMAGE when defining a function from a Docker image.
  runtime: Runtime.PROVIDED_AL2,
  handler: "does_not_matter",
  // The function execution time (in seconds) after which Lambda terminates the function.
  functionName: "rust-based-aws-lambda-example"
  });

***runtime ***— For Rust to create an AWS Lambda function, you must create a custom runtime and build your role as a standalone executable. Runtime.PROVIDED_AL2 Provides custom runtime.

***code ***— The folder path where cargo lambda build created the bootstrap executable.***code ***— The folder path where cargo lambda build created the bootstrap executable.

***handler***: — This name does not matter in case of custom runtime.

To test the function, we can use [AWS Lambda Function URL](https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html). A function URL is a dedicated HTTP(S) endpoint for your Lambda function.

The code snippet below will help create a function URL for the lambda.

    const fnUrl = handler.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });
    
    new CfnOutput(this, 'TheUrl', {
      // The .url attributes will return the unique Function URL
      value: fnUrl.url,
    });

For AWS CDK-based deployment, we are going to use cdk synth and cdk deploy command.
cdk synth It is short for "synthesize" and is used to generate CloudFormation templates from your CDK code. The CloudFormation templates define the AWS resources created when you deploy your infrastructure.

cdk deploy It is used to deploy your infrastructure to AWS. When you run the cdk deploy command, the CDK will use the CloudFormation templates generated  cdk synth to create or update the specified resources in your AWS account.

    # Synthesize the CloudFormation templates
    cdk synth
    
    # Deploy the infrastructure to AWS
    cdk deploy

This will deploy the lambda, and you will get the URL for the test in the terminal output.

![](https://cdn-images-1.medium.com/max/3220/1*3tVtVw7T9oRL9ww3B06UIA.png)

![](https://cdn-images-1.medium.com/max/2000/1*hwRBMdPRmDMaxj9WP91R_Q.png)

## Cleanup

For clean-up, you can use cdk destroy the command that will delete the CloudFormation stack.

## Source Code

For source code, please refer to the [link](https://github.com/Durgaprasad-Budhwani/migrate-mongo-on-aws-lambda)
