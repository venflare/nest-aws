import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Interval } from '@nestjs/schedule';
// import * as aws from 'aws-sdk';
import { LoggerService } from '../logger/logger.service';
import { EnqueueEmailDto } from './dtos';

// aws.config.update({ region: 'eu-central-1' });

// const sqs: aws.SQS = new aws.SQS();
// const ses: aws.SES = new aws.SES();
const standardQueueUrl =
  'https://sqs.eu-central-1.amazonaws.com/022447105744/EmailNotificationQueueStandrard';
// const standardQueueUrl = process.env.AWS_SQS_STANDARD_URL;

@Injectable()
export class NotificationsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {}

  enqueueEmail(enqueueEmailDto: EnqueueEmailDto): HttpStatus {
    // const paramsQueueSendMessage: aws.SQS.SendMessageRequest = {
    //   MessageBody: JSON.stringify(enqueueEmailDto),
    //   QueueUrl: standardQueueUrl,
    // };

    // sqs.sendMessage(paramsQueueSendMessage, (error: aws.AWSError, data: aws.SQS.SendMessageResult): void => {
    //   if (error) {
    //     this.loggerService.error(`Send queue message error => ${error}`);
    //   } else {
    //     this.loggerService.log(`Send queue message success => ${data}`);
    //   }
    // });

    return HttpStatus.CREATED;
  }

  // @Interval(5000)
  // processThenDeleteQueueMessages(): void {
  //   const paramsQueueReceiveMessage: aws.SQS.ReceiveMessageRequest = {
  //     MaxNumberOfMessages: 1,
  //     QueueUrl: standardQueueUrl,
  //     VisibilityTimeout: 15,
  //     WaitTimeSeconds: 0,
  //   };

  //   sqs.receiveMessage(paramsQueueReceiveMessage, (error: aws.AWSError, data: aws.SQS.ReceiveMessageResult): void => {
  //     if (error) {
  //       this.loggerService.error(`Receive queue message error => ${error}`);
  //     } else if (data.Messages) {
  //       const enqueueEmailDto: EnqueueEmailDto = JSON.parse(data.Messages[0].Body);
  //       const messageReceiptHandle: string = data.Messages[0].ReceiptHandle;

  //       this.loggerService.log(`Receive queue message success => ${enqueueEmailDto}`);

  //       const paramsEmailSendEmail: aws.SES.SendEmailRequest = {
  //         Destination: {
  //           ToAddresses: [enqueueEmailDto.emailTo],
  //         },
  //         Message: {
  //           Body: {
  //             Text: { Data: `Hi ${enqueueEmailDto.userGreetingName}, ${enqueueEmailDto.emailMessage}.` },
  //           },

  //           Subject: { Data: enqueueEmailDto.emailSubject },
  //         },
  //         Source: this.configService.get('EMAIL_SERVICE_SOURCE_ADDRESS_MAIN'),
  //       };
  //       ses.sendEmail(paramsEmailSendEmail, (error: aws.AWSError, data: aws.SES.SendEmailResponse): void => {
  //         if (error) {
  //           this.loggerService.error(`Send mail error => ${error}`);
  //         } else {
  //           this.loggerService.log(`Send mail success => ${data}`);

  //           const paramsQueueDeleteMessage: aws.SQS.DeleteMessageRequest = {
  //             QueueUrl: standardQueueUrl,
  //             ReceiptHandle: messageReceiptHandle,
  //           };
  //           sqs.deleteMessage(paramsQueueDeleteMessage, (error: aws.AWSError, data: any): void => {
  //             if (error) {
  //               this.loggerService.error(`Delete queue message error => ${error}`);
  //             } else {
  //               this.loggerService.log(`Delete queue message success => ${data}`);
  //             }
  //           });
  //         }
  //       });

  //       this.processThenDeleteQueueMessages();
  //     }
  //   });
  // }
}
