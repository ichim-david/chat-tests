#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSMutableArray *waterIntakes = [NSMutableArray array];
        double totalWaterIntake = 0.0;
        char input[256];
        
        NSLog(@"Welcome to the Water Intake Logger!");
        NSLog(@"You can log your water intake in liters.");
        NSLog(@"Type 'exit' to finish logging and see your total intake.");

        while (1) {
            NSLog(@"Enter the amount of water consumed in liters: ");
            fgets(input, sizeof(input), stdin);
            NSString *inputString = [NSString stringWithUTF8String:input];
            inputString = [inputString stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
            
            if ([inputString isEqualToString:@"exit"]) {
                break;
            }
            
            NSScanner *scanner = [NSScanner scannerWithString:inputString];
            double intake;
            if ([scanner scanDouble:&intake] && [scanner isAtEnd] && intake > 0) {
                [waterIntakes addObject:@(intake)];
                totalWaterIntake += intake;
                totalWaterIntake += intake;
                NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
                [dateFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
                NSString *timestamp = [dateFormatter stringFromDate:[NSDate date]];
                NSLog(@"[%@] Logged: %.2f liters", timestamp, intake);
            } else {
                NSLog(@"Invalid input. Please enter a positive number.");
            }
        }
        
        if (waterIntakes.count > 0) {
            NSLog(@"Total water intake: %.2f liters", totalWaterIntake);
            NSLog(@"Average intake: %.2f liters", totalWaterIntake / waterIntakes.count);
            NSLog(@"Water intake log: %@", waterIntakes);
        } else {
            NSLog(@"No water intake logged.");
            NSLog(@"Total water intake: 0 liters");
            NSLog(@"Average intake: 0 liters");
            NSLog(@"Water intake log: []");
            NSLog(@"Thank you for using the Water Intake Logger!");
        }
    }
    return 0;
}
