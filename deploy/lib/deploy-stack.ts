import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from "path";
import {Code, Function, Runtime, FunctionUrlAuthType} from "aws-cdk-lib/aws-lambda";
import {CfnOutput} from "aws-cdk-lib";

export class DeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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

    const fnUrl = handler.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, 'TheUrl', {
      // The .url attributes will return the unique Function URL
      value: fnUrl.url,
    });
  }
}
