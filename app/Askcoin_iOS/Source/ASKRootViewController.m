//
//  ASKRootViewController.m
//  Askcoin
//
//  Created by 朱国清 on 2017/6/5.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import "ASKRootViewController.h"
#import "GBridgeManager.h"

@interface ASKRootViewController ()

@end

@implementation ASKRootViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    RCTRootView * rnView = [[GBridgeManager shareInstance]genRnViewWithModule:@"Askcoin" initProps:NULL];
    rnView.frame = self.view.bounds;
    [self.view addSubview:rnView];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

@end
